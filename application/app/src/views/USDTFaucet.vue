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
      <Button type="success" class="submit-btn" @click="childChainGasFaucetSubmitHandler">
        Submit
      </Button>
    </span>


    <br>
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
      <Button type="success" class="submit-btn" @click="parentChainGasFaucetSubmitHandler">
        Submit
      </Button>
    </span>
  </div>

</template>

<script>

import {web3Util} from "@/scripts/web3Util/web3Util";
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
      parentChainFaucetSpinShow:false
    }
  },
  methods: {
    USDTFaucetSubmitHandler() {
      this.USDTFaucetSpinShow = true;
      // alert(this.formFaucet.USDTReceiver);
      web3Util.getUSDTFromFaucet(this.formFaucet.USDTReceiver, this.USDTFaucetSubmitCallback);
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
      this.gameChainFaucetSpinShow = true;
      web3Util.getChildChainGasFromFaucet(this.formFaucet.childChainGasReceiver, this.childChainGasFaucetSubmitCallback);
    },
    childChainGasFaucetSubmitCallback(){
      this.$Message.success("Game Chain Gas Faucet Successfully Transacted");
      this.gameChainFaucetSpinShow=false;
    },
    parentChainGasFaucetSubmitHandler(){
      this.parentChainFaucetSpinShow = true;
      web3Util.getParentChainGasFromFaucet(this.formFaucet.parentChainGasReceiver, this.parentChainGasFaucetSubmitCallback);
    },
    parentChainGasFaucetSubmitCallback(){
      this.$Message.success("Public Chain Gas Faucet Successfully Transacted");
      this.parentChainFaucetSpinShow=false;
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