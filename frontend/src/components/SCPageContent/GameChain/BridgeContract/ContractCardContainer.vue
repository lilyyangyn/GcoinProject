<template>
  <Card class="contract-info-container">
    <Collapse style="width: 100%">
      <Panel name="contractInfo">
        Contract Info
        <div slot="content">
          <div>
            <label>Contract Address:</label>
            0x0E11CAAf9602b0be7858464b9B674a9fD5a7A268
          </div>
          <div>
            <label>Transaction hash:</label>
            0x426cfb1c80ca43c2cec23627013c109869b9bf883734a2948f9cce1822ca6cb5
          </div>
          <div>
            <label>Blockchain Chain Network:</label>
            EGES
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
  name: "BridgeContractCardContainer",
  components:{
    SourceCode,
  }
}
</script>

<style scoped>

</style>