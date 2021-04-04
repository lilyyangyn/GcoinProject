<template>
  <Collapse accordion simple>
    <Panel name="allowanceFunction">
      Allowance
      <div slot="content">
        <label>owner</label>
        <input type="text"></input>
        <label>spender</label>
        <input type="text"></input>
        <Button type="success" @click="gcoin.refreshAllowance(callbackRefreshAllowence)">read</Button>
      </div>
    </Panel>
    <Panel name="balanceOf">
      Balance_Of
      <div slot="content">
        <label>owner</label>
        <input type="text"></input>
        <Button type="success" @click="gcoin.refreshBalance(callbackRefreshBalance)">read</Button>
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

    methods: {

    created(){
      this.gcoin = Gcoin;
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