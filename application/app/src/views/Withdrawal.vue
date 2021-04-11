<template>
	<div >
		<h1 style="text-align: center">Withdraw</h1>
    <Tabs type="card" class="card-container">
      <TabPane label="withdraw">
        <Card style="width:100%">
          <Form  label-position="left" :label-width="70" class="form-container">
            <FormItem label="Amount">
              <Input  placeholder="amount" v-model="depositValue"></Input>
            </FormItem>
<!--            <FormItem label="Address">-->
<!--              <Input  placeholder="amount"></Input>-->
<!--            </FormItem>-->
<!--            <FormItem label="Payment">-->
<!--              <Select  placeholder="Select Your Payment Method">-->
<!--                <Option value="0">EPS</Option>-->
<!--                <Option value="1">UnionPay</Option>-->
<!--              </Select>-->
<!--            </FormItem>-->
          </Form>
<!--          <span class="charging-amount-container">-->
<!--              <p class="charging-amount">USD Charging:</p>-->
<!--              <p class="charging-amount"></p>-->
<!--            </span>-->
        </Card>
        <Button type="success" class="confirm-btn" @click="transferToHomeChain()">Confirm</Button>
      </TabPane>
    </Tabs>
<!--		<button @click="transferToHomeChain()">click8</button>-->
<!--		<button @click="register()">register</button>-->
<!--		<button @click="bridgeableTokenTransfer()">crosschain</button>-->
	</div>
</template>

<script>
	import {web3Util} from "@/scripts/web3Util/web3Util";
 
	import { USDTExchcoinExchange } from '@/scripts/homechain/USDTExchcoinExchange';
	import { BridgeableToken_Home } from '@/scripts/homechain/BridgeableToken';
	import { BridgeableToken_Child } from '@/scripts/contracts/BridgeableToken'
	import { GcoinExchcoinExchange } from '@/scripts/contracts/GcoinExchcoinExchange'
	import { Gcoin } from '@/scripts/contracts/gcoin'
	import {vm} from "@/main";

	export default {
		name: 'CrossChainWithdraw',
		data() {
			return {
				depositValue: 0,
			}
		},
		methods: {
			async register() {
				const privKey = '5163306b4585562200c1102805c215b42fb3fc2863c55c9fe0d0a2bbf18d7f93';

				await GcoinExchcoinExchange.start();
				const tx = {
					to: GcoinExchcoinExchange.contractAddr,
					gas: 1000000,
					gasPrice: 10000000000,
					value: 0,
					data: GcoinExchcoinExchange.meta.methods.registerCompany(localStorage.getItem('address'), true).encodeABI()
				} 
				if (web3Util.childChainWeb3 == null) {
					await web3Util.childChainWeb3Initialize()
				}
				web3Util.signTransaction(web3Util.childChainWeb3, tx, privKey, null, null, (error) => console.log);
			},

			async transferToHomeChain() {
				let self = this;

				await GcoinExchcoinExchange.checkSelfRegister((err, res) => {
					if (!err) {
						if (res) {
							self.startTransferToHomeChain();
						} else {
							this.$Message.error("You are not permitted to withdraw. Sorry");
						}
					} else {
						console.error(error);
					}
				})
			},

			async startTransferToHomeChain() {
				let self = this;

				// USDT approval
				let currentAllowance = 0;
				await Gcoin.refreshAllowance(GcoinExchcoinExchange.contractAddr, function(error, result) {
					if (!error) {
						currentAllowance = result;
					} else {
						console.error(error);
					}
					
					self.refreshGcoinAllowanceCallback(error, result);
				});
				
				if (currentAllowance < this.depositValue) {
					console.log("Approval starts!");
					await Gcoin.approve(GcoinExchcoinExchange.contractAddr, this.depositValue, () => {
							self.$Message.success("Approval succeeds!")
							console.log("Approval succeeds!");
							self.exchcoinExchange();
					}, (error) => {
						console.error(error);
						self.$Message.error("Fail to allow the platform to spend your Gcoin. \nPlease try again or do the allowance explicitly.");
					});
				} else {
					this.exchcoinExchange();
				}
			},

			exchcoinExchange() {
				console.log("Exchcoin-exchange starts!");
				let self = this;
				GcoinExchcoinExchange.GcoinToExchcoin(this.depositValue, () => {
					self.$Message.success("Exchcoin-exchange succeeds!");
					console.log("Exchcoin-exchange succeeds!");
					vm.$emit('GcoinBalanceUpdate');
					vm.$emit('childChainExchgCoinBalanceUpdate');
					self.bridgeableTokenTransfer();
				}, (error) => {
					console.error(error);
					self.$Message.error("Fail to reserve Exchcoin.\nPlease check whether you are allowed to do this. \nPlease try again or do the reservation explicitly.");
				});
			},

			bridgeableTokenTransfer() {
				let self = this;
				console.log("Crosschain-trial starts!");
				BridgeableToken_Child.transferToHomechain(this.depositValue, null, () => {
					console.log("Crosschain succeeds!");
					self.$Message.success("Crosschain succeeds!");
					vm.$emit('childChainExchgCoinBalanceUpdate');
					vm.$emit('parentChainExchgCoinBalanceUpdate');
		      		self.approveUSDTExchange();
				}, (error) => {
					console.error(error);
					self.$Message.error("Fail to start crosschain transfer.\nPlease try again or do the transfer explicitly.");
				});
			},

		    approveUSDTExchange() {
		    	console.log("Approve-USDT-exchange starts");
		    	let self = this;
		    	BridgeableToken_Home.approve(this.depositValue, () => {
		    		self.$Message.success("Approve-USDT-exchange succeeds!");
					console.log("Approve-USDT-exchange succeeds!");
					self.USDTExchange()
		    	}, (error) => {
		    		console.error(error);
		    		self.$Message.error("Fail to approve Gcoin-exchange. \n Please try again or do the approval explicitly");
		    	});
		    },

    		USDTExchange() {
    			console.log("USDT-exchange starts!");
				let self = this;
				USDTExchcoinExchange.exchcoinToUSDT(this.depositValue, () => {
					console.log("USDT-exchange succeeds!");
					self.$Message.success("USDT-exchange succeeds!");
					vm.$emit('parentChainExchgCoinBalanceUpdate');
					vm.$emit('USDTBalanceUpdate')
				}, (error) => {
					console.error(error);
					self.$Message.error("Fail to reserve USDT.\nPlease try again or do the reservation explicitly.");
				});
    		},

			/* UI Callback */

			refreshGcoinAllowanceCallback(error, result) {
				if (!error) {
					// const USDTAllowanceElement = document.getElementById("usdt-allowance");
					// USDTAllowanceElement.innerHTML = result;
					console.log("GcoinAllowance: "+result)
				} else {
					this.$Message.error("Fail to get Gcoin allowance.");
				}
			},

		},
	}
</script>

<style>
/*.page-container {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  align-items: center;*/
/*}*/

.card-container {
  margin: auto;
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