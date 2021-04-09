<template>
  <div class="page-container">
    <h1 class="page-title">USDT Faucet</h1>
    <span class="card-container">
      <Card>
        <Form :model="formFaucet" label-position="left" :label-width="70" class="form-container">
          <FormItem label="Receiver">
            <Input v-model="formFaucet.USDTReceiver" placeholder="public address"></Input>
          </FormItem>
        </Form>
        <Spin class="spin" v-if="USDTFaucetSpinShow">
          <Icon type="ios-loading" size=25 class="demo-spin-icon-load"></Icon>
        </Spin>
      </Card>
      <Button type="success" class="submit-btn" @click="USDTFaucetSubmitHandler">
        Submit
      </Button>
    </span>

    <br>
    <br>

    <h1 class="page-title">Game Chain Gas Faucet</h1>
    <span class="card-container">
      <Card>
        <Form :model="formFaucet" label-position="left" :label-width="70" class="form-container">
          <FormItem label="Receiver">
            <Input v-model="formFaucet.childChainGasReceiver" placeholder="public address"></Input>
          </FormItem>
        </Form>
        <Spin class="spin" v-if="gameChainFaucetSpinShow">
          <Icon type="ios-loading" size=25 class="demo-spin-icon-load"></Icon>
        </Spin>
      </Card>
      <Button type="primary" class="submit-btn" @click="childChainGasFaucetSubmitHandler">
        Submit
      </Button>
    </span>

    <br>
    <br>

    <h1 class="page-title">Public Chain Gas Faucet</h1>
    <span class="card-container">
      <Card>
        <Form :model="formFaucet" label-position="left" :label-width="70" class="form-container">
          <FormItem label="Receiver">
            <Input v-model="formFaucet.parentChainGasReceiver" placeholder="public address"></Input>
          </FormItem>
        </Form>
        <Spin class="spin" v-if="parentChainFaucetSpinShow">
          <Icon type="ios-loading" size=25 class="demo-spin-icon-load"></Icon>
        </Spin>
      </Card>
      <Button type="warning" class="submit-btn" @click="parentChainGasFaucetSubmitHandler">
        Submit
      </Button>
    </span>
    <br>
    <br>
  </div>

</template>

<script>

import {web3Util} from "@/scripts/web3Util/web3Util";
import {utilConfig} from "@/scripts/web3Util/config";
import {contractAbi} from "@/scripts/web3Util/contractAbi";
import home from "@/views/Home";
import {vm} from "@/main";

export default {
  name: "USDTFaucet",
  data() {
    return {
      formFaucet: {
        USDTReceiver: "",
        parentChainGasReceiver:"",
        childChainGasReceiver:"",
      },
      USDTFaucetSpinShow: false,
      gameChainFaucetSpinShow:false,
      parentChainFaucetSpinShow:false,
      privateKey: "c9e0723ee95a1aa3d12d161be4d210d6ddf4e23e09c65ac1387ec1398a267f71",
    }
  },
  methods: {
    USDTFaucetSubmitHandler() {
      if (this.formFaucet.USDTReceiver.length != 42 || !this.formFaucet.USDTReceiver.startsWith('0x')) {
        this.$Message.error("Invalid USDT Receiver Address");
        return;
      }
      this.USDTFaucetSpinShow = true;
      // alert(this.formFaucet.USDTReceiver);
      this.getUSDTFromFaucet(this.formFaucet.USDTReceiver, this.USDTFaucetSubmitCallback);
      //     .then((resolve) => {
      //   console.log("log"+resolve);
      // })
    },
    USDTFaucetSubmitCallback(resolved) {
      // console.log("call back function running");
      web3Util.getUserUSDTBalance().then((resolved) => {
        // console.log("finish get USDT balance after transact with faucet");
        let numerals = require('numeral');
        let balance = numerals(parseInt(resolved)).format('0,0');
        // console.log("UST balance: " + balance);
        // home.data().coinBalance.USDTBalance = balance;
        vm.$emit('USDTBalanceUpdate');
        this.$Message.success("USDT Faucet Successfully Transacted");
        this.USDTFaucetSpinShow = false;
      });
      // console.log(resolved);
      // home.methods.USDTBalanceUpdate();
      // this.$Message.success("Faucet Transaction Run Success");
    },
    childChainGasFaucetSubmitHandler(){
      if (this.formFaucet.childChainGasReceiver.length != 42 || !this.formFaucet.childChainGasReceiver.startsWith('0x')) {
        this.$Message.error("Invalid Child-chain Gas Receiver Address");
        return;
      }
      this.gameChainFaucetSpinShow = true;
      this.getChildChainGasFromFaucet(this.formFaucet.childChainGasReceiver, this.childChainGasFaucetSubmitCallback);
    },
    childChainGasFaucetSubmitCallback(){
      this.$Message.success("Game Chain Gas Faucet Successfully Transacted");
      this.gameChainFaucetSpinShow=false;
    },
    parentChainGasFaucetSubmitHandler(){
      if (this.formFaucet.parentChainGasReceiver.length != 42 || !this.formFaucet.parentChainGasReceiver.startsWith('0x')) {
        this.$Message.error("Invalid Home-chain Gas Receiver Address");
        return;
      }
      this.parentChainFaucetSpinShow = true;
      this.getParentChainGasFromFaucet(this.formFaucet.parentChainGasReceiver, this.parentChainGasFaucetSubmitCallback);
    },
    parentChainGasFaucetSubmitCallback(){
      this.$Message.success("Public Chain Gas Faucet Successfully Transacted");
      this.parentChainFaucetSpinShow=false;
    },

    /* Utility */

    getUSDTFromFaucet: async function (receiver, confirmedCallback) {

        if (web3Util.parentChainWeb3 == null) {
            await web3Util.homeChainWeb3Initialize();
        }

        // alert(receiver);
        const myContract = new web3Util.parentChainWeb3.eth.Contract(contractAbi.USDTFaucetAbi, utilConfig.homeChainContractAddress.USDT_Faucet);

        const tx = {
            to: utilConfig.homeChainContractAddress.USDT_Faucet,
            gas: 100000,
            gasPrice: 10000000000,
            value: 0,
            data: myContract.methods.getUSDT(receiver).encodeABI()
        };
        web3Util.signTransaction(web3Util.parentChainWeb3, tx, this.privateKey, null, confirmedCallback);
    },

    getParentChainGasFromFaucet: async function (receiver,confirmedCallback) {

        if (web3Util.parentChainWeb3 == null) {
            await web3Util.homeChainWeb3Initialize();
        }

        const tx = {
            from: utilConfig.faucet.faucetPublicKey,
            to: receiver,
            gas: 100000,
            gasPrice: 10000000000,
            value: utilConfig.faucet.homeChainGasFaucetValue,
        };
        web3Util.signTransaction(web3Util.parentChainWeb3, tx, utilConfig.faucet.faucetAccPrivateKey, null, confirmedCallback);
    },

    getChildChainGasFromFaucet: async function (receiver,confirmedCallback) {
        // alert(receiver);
        if (web3Util.childChainWeb3 == null) {
            await web3Util.childChainWeb3Initialize();
        }

        const tx = {
            from: utilConfig.faucet.faucetPublicKey,
            to: receiver,
            gas: 1000000,
            gasPrice: 10000000000,
            value: utilConfig.faucet.childChainGasFaucetValue,
        };
        web3Util.signTransaction(web3Util.childChainWeb3, tx, utilConfig.faucet.faucetAccPrivateKey, null, confirmedCallback);
    },
  }
}
</script>

<style scoped>

.card-container {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.submit-btn {
  width: 100%;
  height: 40px;
  margin-top: 2%;
  margin-right: 2%;
}

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}

.spin {
  /*float: right;*/
  position: absolute;
  bottom: 5%;
  right: 3%;
}

</style>