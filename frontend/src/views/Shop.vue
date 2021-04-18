<template>
  <div class="page-container">
    <h1 class="page-title">Buy Gcoin</h1>
    <Tabs type="card" class="card-container">
      <TabPane label="USD">
        <Card style="width:100%">
            <Form :model="formGameLaunch" label-position="left" :label-width="70" class="form-container">
              <FormItem label="Amount">
                <Input v-model="formGameLaunch.amount" @on-keyup="integer1()"></Input>
              </FormItem>
              <FormItem label="Address">
                <Input v-model="formGameLaunch.address"></Input>
              </FormItem>
              <FormItem label="Payment">
                <Select v-model="formGameLaunch.paymentMethod" placeholder="Select Your Payment Method">
                  <Option value="0">EPS</Option>
                  <Option value="1">UnionPay</Option>
                </Select>
              </FormItem>
            </Form>
            <span class="charging-amount-container">
              <p class="charging-amount">USD Charging:</p>
              <p class="charging-amount">$ {{formGameLaunch.amount}}</p>
            </span>
        </Card>
        <Button type="success" class="confirm-btn">Confirm</Button>
      </TabPane>
      <TabPane label="Deposit">
        <Card style="width:100%">
          <Form label-position="left" :label-width="70" class="form-container">

            <FormItem label="Amount">
              <Input v-model="initDepositVal" placeholder="amount" @on-keyup="integer2()" />

            </FormItem>
<!--            <FormItem label="Address">-->
<!--              <Input v-model="formStableCoinBuyGcoin.address" placeholder="address"></Input>-->
<!--            </FormItem>-->
          </Form>

          <span class="charging-amount-container">
              <p class="charging-amount">Stable Coin Charging:</p>
              <p class="charging-amount">$ {{depositValue}}</p>

            </span>
        </Card>
        <Button  v-if="notAllow" class="confirm-btn">
        <Spin class="spin">
          <Icon type="ios-loading" size=25 style="animation: ani-demo-spin 1s linear infinite;"></Icon>
        </Spin>
        </Button>
        <Button v-else type="success" class="confirm-btn" @click="transferToChildChain()">Confirm
        </Button>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import {web3Util} from "@/scripts/web3Util/web3Util";
import {utilConfig} from "@/scripts/web3Util/config";
import {contractAbi} from "@/scripts/web3Util/contractAbi";

import { USDTS } from '@/scripts/homechain/USDTS';
import { USDTExchcoinExchange } from '@/scripts/homechain/USDTExchcoinExchange';
import { BridgeableToken_Home } from '@/scripts/homechain/BridgeableToken';
import { BridgeableToken_Child } from '@/scripts/contracts/BridgeableToken'
import { GcoinExchcoinExchange } from '@/scripts/contracts/GcoinExchcoinExchange'

import {vm} from "@/main";

export default {
  data () {
    return {
      formGameLaunch : {
        amount:'',
        address:'',
        paymentMethod:''
      },
      initDepositVal: 1,
      notAllow: false,
      depositValue: 0,

    }
  },
  methods: {
    integer1() {
      if (this.formGameLaunch.amount == 0) {
        this.formGameLaunch.amount = ""
      } else {
        this.formGameLaunch.amount = this.formGameLaunch.amount.replace(/\D/g, '')
      }

    },
    integer2() {
      if (this.initDepositVal == 0) {
        this.initDepositVal = ""
      } else {
        this.initDepositVal = this.initDepositVal.replace(/\D/g, '')
      }

    },
    async transferToChildChain() {
        this.depositValue=this.initDepositVal;
        this.notAllow=true;
        let self = this;

        // USDT balance chek
        let currentBalance = 0;
        await USDTS.refreshBalance(function(error, result) {
          if (!error) {
            currentBalance = result;
          } else {
            console.error(error);
            self.notAllow=false;
          }
        })
        if (currentBalance < this.depositValue) {
          this.$Message.error("USDT Not Enough!");
          this.$emit('USDTBalanceUpdate');
          return;
        }

        // USDT approval
        let currentAllowance = 0;
        await USDTS.refreshAllowance(function(error, result) {
          if (!error) {
            currentAllowance = result;
          } else {
            console.error(error);
            self.notAllow=false;
          }
          
          self.refreshUSDTAllowanceCallback(error, result);
        });
        
        if (currentAllowance < this.depositValue) {
          console.log("Approval starts!");
          await USDTS.approve(this.depositValue, () => {
              self.$Message.success("Approval Succeeds!")
              console.log("Approval succeeds!");
              self.exchcoinExchange();
          }, (error) => {
            console.error(error);
            self.$Message.error("Fail to Allow The Platform to Spend Your USDT");
            self.notAllow=false;
          });
        } else {
          this.exchcoinExchange();
        }
      },

      exchcoinExchange() {
        console.log("Exchcoin-exchange starts!");
        let self = this;
        USDTExchcoinExchange.USDTToExchcoin(this.depositValue, () => {
          self.$Message.success("Exchcoin-exchange Succeeds!");
          console.log("Exchcoin-exchange succeeds!");
          vm.$emit('USDTBalanceUpdate');
          vm.$emit('parentChainExchgCoinBalanceUpdate');
          self.checkGasAndStartChildchainAction();
        }, (error) => {
          console.error(error);
          self.$Message.error("Fail to Reserve Exchcoin");
          self.notAllow=false;
        });
      },

      bridgeableTokenTransfer() {
        let self = this;
        console.log("Crosschain-trial starts!");
        BridgeableToken_Home.transferToChildChain(this.depositValue, this.getSignatureAndExecute, () => {
          self.$Message.success("Start Crosschain Depositing!");
          console.log("Start crosschain deposit!");
          vm.$emit('parentChainExchgCoinBalanceUpdate');
        }, (error) => {
          console.error(error);
          self.$Message.error("Fail to Start Crosschain Transfer");
          self.notAllow=false;
        });
      },

      checkGasAndStartChildchainAction() {
        if (localStorage.getItem('address')!=null && localStorage.getItem('address')!=""){
          web3Util.checkChildChainBalance(localStorage.getItem('address')).then((gas) => {
            if (gas >= 100000000000000000) {
              this.bridgeableTokenTransfer();
            } else {
              this.$Message.error("Childchain Address Insufficient Funds");
              this.notAllow=false;
            }
          })
        } else {
          this.$Message.error("You Should First Set Your Key In Wallet Manager");
          this.notAllow=false;
        }
      },

      async getSignatureAndExecute(resolved){
        //trim the message with signature request
        let data = resolved.logs[4].data;
        let topic1 = resolved.logs[4].topics[1].slice(2);
        let topic1Index = data.indexOf(topic1);
        let encodeData = "0x" + data.slice(topic1Index,data.length-22);
        console.log("encode data: "+encodeData);

        //get signature
        let signature = null;
        while(signature == null){
          console.log("while looping up");
          // periodically asking for signature by sleeping the thread
          await new Promise(resolve => setTimeout(resolve, 15000));
          console.log("finish sleep");
          await web3Util.getSignature(encodeData).then((resolved) => {
            console.log("resolved: " + encodeData);
            signature = resolved;
            console.log("signature: " + signature);
          }).catch(error => {
            console.log(error);
            this.notAllow=false;
          });
        }

        //pass the signature and message to the chain
        console.log("Sign Execution starts!");
        let self = this;
        await this.signExecute(encodeData, signature, () => {
          console.log("Sign Execution succeeds!");
          self.$Message.success("Sign Execution succeeds");
          vm.$emit('childChainExchgCoinBalanceUpdate');
          self.approveGcoinExchange();
        }, (error) => {
          console.error(error);
          self.$Message.error("Fail to Sign Execution");
          self.notAllow=false;
        });

      },

      approveGcoinExchange() {
        console.log("Approve-Gcoin-exchange starts");
        let self = this;
        BridgeableToken_Child.approve(this.depositValue, () => {
          self.$Message.success("Approve-Gcoin-exchange Succeeds!");
          console.log("Approve-Gcoin-exchange succeeds!");
          self.gcoinExchange();

        }, (error) => {
          console.error(error);
          self.$Message.error("Fail to Approve Gcoin-exchange");
          self.notAllow=false;
        });
      },

      gcoinExchange() {
        console.log("Gcoin-exchange starts!");
      let self = this;
      GcoinExchcoinExchange.exchcoinToGcoin(this.depositValue, () => {
        self.$Message.success("Gcoin-exchange Succeeds!");
        console.log("Gcoin-exchange succeeds!");
        vm.$emit('childChainExchgCoinBalanceUpdate');
        vm.$emit('GcoinBalanceUpdate');
        self.notAllow=false;
      }, (error) => {
        console.error(error);
        self.$Message.error("Fail to Reserve Gcoin");
        self.notAllow=false;
      });
    },

    signExecute: async function (message, signature, confirmCallback, errorCallback) {

        if (web3Util.childChainWeb3 == null) {
            await web3Util.childChainWeb3Initialize();
        }

        const myContract = new web3Util.childChainWeb3.eth.Contract(contractAbi.ForeignBridgeAbi, utilConfig.childChainContractAddress.Foreign_Bridge_Mediator);

        const tx = {
            to: utilConfig.childChainContractAddress.Foreign_Bridge_Mediator,
            gas: 10000000,
            gasPrice: 10000000000,
            value: 0,
            data: myContract.methods.executeSignatures(message, signature).encodeABI()
        };

        web3Util.signTransactionWithLocalKey(web3Util.childChainWeb3, tx, null, confirmCallback, errorCallback);
    },

    /* UI Callback */

    refreshUSDTAllowanceCallback(error, result) {
      if (!error) {
        // const USDTAllowanceElement = document.getElementById("usdt-allowance");
        // USDTAllowanceElement.innerHTML = result;
        console.log("USDTAllowance: "+result)
      } else {
        this.$Message.error("Fail to Get USDT Allowance.");
        this.notAllow=false;
      }
    },
  }
}
</script>

<style>
/*.page-container {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  align-items: center;*/
/*}*/
.spin{

}
.card-container {
  width: 60%;
  display: flex;
  flex-direction: column;
}

.charging-amount-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.charging-amount {
  font-weight: bold;
  font-size: 15px;
  /*margin: 2%;*/
  width: 25%;
}

.confirm-btn {
  /*margin: 2%;*/
  /*position: relative;*/
  /*left: 25%;*/
  float: right;
  width: 25%;
  height: 40px;
  margin-top: 2%;
  margin-right: 2%;
}


</style>