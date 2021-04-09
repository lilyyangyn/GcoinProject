<template>
  <Card class="contract-info-container">
    <Collapse style="width: 100%">
      <Panel name="contractInfo">
        Contract Info
        <div slot="content">
          <div>
            <label>Contract Address:</label>
            0x68a6fDC3a75d8Bb23b2F789b53A84e0C4f3Cd277
          </div>
          <div>
            <label>Transaction hash:</label>
            0xe26f7ab108dbf91da9d46fece1f6bbaa94054d0224c76894e4826131e50cb73d
          </div>
          <div>
            <label>Blockchain Chain Network:</label>
            Sokol
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