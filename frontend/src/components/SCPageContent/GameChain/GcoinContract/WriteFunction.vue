<template>
  <Collapse accordion simple>
    <Panel name="approveFunction">
      Approve
      <!-- <div slot="content">
        <label>spender</label>
        <input type="text"></input>
        <label>value</label>
        <input type="text"></input>
        <Button type="success">write</Button>
      </div> -->
      <div slot="content">
      <label>spender</label>
      <input type="text" placeholder="" id="approve-spender" v-model="spender">
      <label>value</label>
      <input type="text" placeholder="" id="approve-value" v-model="approveValue">
      <Button type="success" @click="approve()">write</Button>

    </div>
    </Panel>
    <Panel name="transferFunction">
      Transfer
      <div slot="content">
        <label>address_to</label>
        <input type="text" v-model="addressTo"></input>
        <label>value</label>
        <input type="text" v-model="transferValue"></input>
        <Button type="success" @click="transfer()">write</Button>
      </div>
    </Panel>
    <Panel name="transferFromFunction">
      Transfer_From
      <div slot="content">
        <label>address_from</label>
        <input type="text"></input>
        <label>address_to</label>
        <input type="text"></input>
        <label>value</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
  </Collapse>
</template>

<script>
import { Gcoin } from '@/scripts/contracts/gcoin.js';
  export default {
    name: "WriteFunction",
    data(){
      return{
        spender: "",
        approveValue: 0,
        addressTo: "",
        transferValue: 0,
      }
    },

    methods: {
      successCallBack(){
        console.log("success");
      },
      errorCallBack(error){
        console.log(error);
      },

      approve(){
        Gcoin.approve(this.spender, this.approveValue, this.successCallBack, this.errorCallBack);
      },
      transfer(){
        Gcoin.transfer(this.addressTo, this.transferValue, this.successCallBack, this.errorCallBack);
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