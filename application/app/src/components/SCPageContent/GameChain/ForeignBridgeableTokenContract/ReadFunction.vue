<template>
  <Collapse accordion simple>
    <!-- https://goerli.etherscan.io/address/0x60Fc1c7347b7D52aB28401311e49e22845C6706E#readContract -->
    <Panel name="mingtingFinishedFunction">
      Mingting_Finished
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
    <Panel name="totalSupplyFunction">
      Total_Supply
      <div slot="content">
        <Button type="success" disabled>read</Button>
      </div>
    </Panel>
    
    <Panel name="permitTypehashFunction">
      PERMIT_TYPEHASH
      <div slot="content">
        <Button type="success" disabled>read</Button>
      </div>
    </Panel>
    <Panel name="decimalsFunction">
      Decimals
      <div slot="content">
        <Button type="success" disabled>read</Button>
      </div>
    </Panel>
    <Panel name="domainSeparatorFunction">
      DOMAIN_SEPARATOR
      <div slot="content">
        <Button type="success" disabled>read</Button>
      </div>
    </Panel>
    <Panel name="versionFunction">
      Version
      <div slot="content">
        <Button type="success" disabled>read</Button>
      </div>
    </Panel>
    <Panel name="balanceOfFunction">
      Balance_Of
      <div slot="content">
        <label>owner</label>
        <input type="text"></input>
        <Button type="success" disabled>read</Button>
      </div>
    </Panel>
    <Panel name="isBridgeFunction">
      Is_Bridge
      <div slot="content">
        <label>address</label>
        <input type="text"></input>
        <Button type="success" disabled>read</Button>
      </div>
    </Panel>
    <Panel name="noucesFunction">
      Nouces
      <div slot="content">
        <label>input</label>
        <input type="text"></input>
        <Button type="success" disabled>read</Button>
      </div>
    </Panel>
    <Panel name="getTokenInterfacesVersionFunction">
      Get_Token_Interfaces_Version
      <div slot="content">
        <Button type="success" disabled>read</Button>
      </div>
    </Panel>
    <Panel name="ownerFunction">
      Owner
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
    <Panel name="bridgeContractFunction">
      Bridge_Contract
      <div slot="content">
        <Button type="success" disabled>read</Button>
      </div>
    </Panel>
    <Panel name="allowanceFunction">
      Allowance
      <div slot="content">
        <label>owner</label>
        <input type="text"></input>
        <label>spender</label>
        <input type="text"></input>
        <Button type="success" disabled>read</Button>
      </div>
    </Panel>
    <Panel name="expirationsFunction">
      Expirations
      <div slot="content">
        <!-- <label>owner</label> -->
        <input type="text"></input>
        <!-- <label>spender</label> -->
        <input type="text"></input>
        <Button type="success" disabled>read</Button>
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