<template>
  <Collapse accordion simple>
    <Panel name="allowanceFunction">
      Allowance
      <div slot="content">
<!--        <label>owner</label>-->
<!--        <input type="text"></input>-->
        <label>spender</label>
        <input type="text" v-model="spender"></input>
        <p id="Allowance"></p>
        <Button type="success" @click="refreshAllowance()">read</Button>
      </div>
    </Panel>
    <Panel name="balanceOf">
      Balance_Of
      <div slot="content">
<!--        <label>owner</label>-->
<!--        <input type="text"></input>-->
        <p id="Balance"></p>
        <Button type="success" @click="refreshBalance()">read</Button>
      </div>
    </Panel>
    <Panel name="decimalsFunction">
      Decimals
      <div slot="content">
        <Button type="success" disabled>read</Button>
      </div>
    </Panel>
    <Panel name="nameFunction">
      Name
      <div slot="content">
        <Button type="success" disabled>read</Button>
      </div>
    </Panel>
    <Panel name="symbolFunction">
      Symbol
      <div slot="content">
        <Button type="success" disabled>read</Button>
      </div>
    </Panel>
    <Panel name="totalSupplyFunction">
      Total_Supply
      <div slot="content">
        <Button type="success" disabled>read</Button>
      </div>
    </Panel>
  </Collapse>
</template>

<script>
import { Gcoin } from '@/scripts/contracts/gcoin.js';
  export default {
    name: "ReadFunction",
    data(){
      return{
        spender: "",
      }
    },

    methods: {

      allowanceCallback(error, result){
        if(error){
          console.log(error);
        }else {
          document.getElementById("Allowance").innerHTML = result;
        }
      },
      ballanceCallback(error, result){
        if(error){
          console.log(error);
        }else{
          document.getElementById("Balance").innerHTML=result;
        }

      },
      refreshBalance(){
        Gcoin.refreshBalance(this.ballanceCallback);
      },
      refreshAllowance(){
        Gcoin.refreshAllowance(this.spender, this.allowanceCallback);
      },

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