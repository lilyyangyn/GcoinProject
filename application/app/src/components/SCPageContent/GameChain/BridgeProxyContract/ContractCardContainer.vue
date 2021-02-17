<template>
  <Card class="contract-info-container">
    <Collapse style="width: 100%">
      <Panel name="contractInfo">
        Contract Info
        <div slot="content">
          <div>
            <label>Contract Address:</label>
            0xB6b13A14AC6D16b879A6C2B1eDE5B4668F564668
          </div>
          <div>
            <label>Transaction hash:</label>
            0x162704269b9557f4bafe779aebe7c9a414649f1330f0ca659e5cb673289f0fc3
          </div>
          <div>
            <label>Blockchain Chain Network:</label>
            Goerli
          </div>
        </div>
      </Panel>
      <Panel name="contractSourceCode">
        Contract Source Code
        <div slot="content" class="source-code-container">
          <SourceCode></SourceCode>
        </div>
      </Panel>
    </Collapse>
  </Card>
</template>

<script>


import SourceCode from "./SourceCode";

export default {
  name: "BridgeStorageProxyContractCardContainer",
  components:{
    SourceCode,
  }
}
</script>

<style scoped>

</style>