<template>
  <Collapse accordion simple>
    <!-- https://ropsten.etherscan.io/address/0xb9Ed6B7c16E4300BB8793daDD632dc39eD2Db119#writeContract -->
    <Panel name="USDTToExchcoinFunction">
      USDT_To_Exchcoin
      <div slot="content">
        <label>_v</label>
        <input type="text"></input>
        <Button type="success">write</Button>
      </div>
    </Panel>
    <Panel name="USDTToExchcoinCoinDeliverFunction">
      USDT_To_Exchcoin_Coin_Deliver
      <div slot="content">
        <label>_v</label>
        <input type="text"></input>
        <Button type="success">write</Button>
      </div>
    </Panel>
    <Panel name="exchcoinToUSDTFunction">
      Exchcoin_To_USDT
      <div slot="content">
        <label>_v</label>
        <input type="text"></input>
        <Button type="success">write</Button>
      </div>
    </Panel>
    <Panel name="exchcoinToUSDTCoinDeliverFunction">
      Exchcoin_To_USDT_Coin_Deliver
      <div slot="content">
        <label>_v</label>
        <input type="text"></input>
        <Button type="success">write</Button>
      </div>
    </Panel>
    <Panel name="transferPltfOwnershipFunction">
      Transfer_Pltf_Ownership
      <div slot="content">
        <label>_a</label>
        <input type="text"></input>
        <Button type="success">write</Button>
      </div>
    </Panel>
  </Collapse>
</template>

<script>
export default {
  name: "WriteFunction"
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