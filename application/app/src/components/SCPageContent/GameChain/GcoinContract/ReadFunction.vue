<template>
  <Collapse accordion simple>
    <Panel name="allowanceFunction">
      Allowance
      <div slot="content">
        <label>owner</label>
        <input type="text"></input>
        <label>spender</label>
        <input type="text"></input>
        <Button type="success">read</Button>
      </div>
    </Panel>
    <Panel name="balanceOf">
      Balance_Of
      <div slot="content">
        <label>owner</label>
        <input type="text"></input>
        <Button type="success">read</Button>
      </div>
    </Panel>
    <Panel name="decimalsFunction">
      Decimals
      <div slot="content">
        <Button type="success">read</Button>
      </div>
    </Panel>
    <Panel name="nameFunction">
      Name
      <div slot="content">
        <Button type="success">read</Button>
      </div>
    </Panel>
    <Panel name="symbolFunction">
      Symbol
      <div slot="content">
        <Button type="success">read</Button>
      </div>
    </Panel>
    <Panel name="totalSupplyFunction">
      Total_Supply
      <div slot="content">
        <Button type="success">read</Button>
      </div>
    </Panel>
  </Collapse>
</template>

<script>
export default {
  name: "ReadFunction"
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