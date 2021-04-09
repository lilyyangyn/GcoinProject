<template>
  <Collapse accordion simple>
    <!-- https://ropsten.etherscan.io/address/0xb9Ed6B7c16E4300BB8793daDD632dc39eD2Db119#writeContract -->
    <Panel name="USDTToExchcoinFunction">
      USDT_To_Exchcoin
      <div slot="content">
        <label>value</label>
        <input type="text" v-model="USDTToExch"></input>
        <Button type="success" @click="USDTToExchFunction()">write</Button>
      </div>
    </Panel>
    <Panel name="USDTToExchcoinCoinDeliverFunction">
      USDT_To_Exchcoin_Coin_Deliver
      <div slot="content">
<!--        <label>_v</label>-->
<!--        <input type="text"></input>-->
        <Button type="success" @click="USDTToExchDeliverFunction()">write</Button>
      </div>
    </Panel>
    <Panel name="exchcoinToUSDTFunction">
      Exchcoin_To_USDT
      <div slot="content">
        <label>value</label>
        <input type="text" v-model="exchToUSDT"></input>
        <Button type="success" @click="exchToUSDTFunction()">write</Button>
      </div>
    </Panel>
    <Panel name="exchcoinToUSDTCoinDeliverFunction">
      Exchcoin_To_USDT_Coin_Deliver
      <div slot="content">
<!--        <label>_v</label>-->
<!--        <input type="text"></input>-->
        <Button type="success" @click="exchToUSDTDeliverFunction()">write</Button>
      </div>
    </Panel>
    <Panel name="transferPltfOwnershipFunction">
      Transfer_Pltf_Ownership
      <div slot="content">
        <label>address</label>
        <input type="text" v-model="transferOwnership"></input>
        <Button type="success" @click="transferOwnershipFunction()">write</Button>
      </div>
    </Panel>
  </Collapse>
</template>

<script>
import { USDTExchcoinExchange } from '@/scripts/homechain/USDTExchcoinExchange.js';

export default {
  name: "WriteFunction",
  data(){
    return{
      exchToUSDT: 0,
      USDTToExch: 0,
      transferOwnership: 0,
    }
  },
  methods: {
    successCallBack(){
      console.log("success");
    },
    errorCallBack(error){
      console.log(error);
    },
    exchToUSDTFunction(){
      USDTExchcoinExchange.exchcoinToUSDT(this.exchToUSDT, this.successCallBack,this.errorCallBack);
    },
    exchToUSDTDeliverFunction(){
      USDTExchcoinExchange.exchcoinToUSDTCoinDeliver(this.successCallBack,this.errorCallBack);
    },
    USDTToExchFunction(){
      USDTExchcoinExchange.USDTToExchcoin(this.USDTToExch,this.successCallBack,this.errorCallBack);
    },
    USDTToExchDeliverFunction(){
      USDTExchcoinExchange.USDTtoExchcoinCoinDeliver(this.successCallBack, this.errorCallBack);
    },
    transferOwnershipFunction(){
      USDTExchcoinExchange.transferPltfOwnership(this.transferOwnership, this.successCallBack, this.errorCallBack);
    }
  }
}
</script>

<style scoped>
label {
  margin-right: 2%;
  font-weight: initial;
}

input {
  margin-right: 4%;
}
</style>