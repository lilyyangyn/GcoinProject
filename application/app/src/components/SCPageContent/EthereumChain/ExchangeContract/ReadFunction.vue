<template>
  <Collapse accordion simple>
<!--     https://ropsten.etherscan.io/address/0xb9Ed6B7c16E4300BB8793daDD632dc39eD2Db119#readContract -->
    <Panel name="exchcoinContractFunction">
      Exchcoin_Contract
      <div slot="content">
        <Button type="success">read</Button>
      </div>
    </Panel>
    <Panel name="exchcoinLedgerFunction">
      Exchcoin_Ledger
      <div slot="content">
        <label>address</label>
        <input type="text"></input>
        <Button type="success">read</Button>
      </div>
    </Panel>
    <Panel name="USDTContractFunction">
      USDT_Contract
      <div slot="content">
        <Button type="success">read</Button>
      </div>
    </Panel>
    
    <Panel name="USDTLedgerFunction">
      USDT_Ledger
      <div slot="content">
        <label>address</label>
        <input type="text"></input>
        <Button type="success">read</Button>
      </div>
    </Panel>
    <Panel name="pltfFeeRateFunction">
      Pltf_Fee_Rate
      <div slot="content">
        <Button type="success">read</Button>
      </div>
    </Panel>
    <Panel name="dpltfOwnerFunction">
      Pltf_Owner
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