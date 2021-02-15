<template>
  <Card class="contract-info-container">
    <Collapse style="width: 100%">
      <Panel name="contractInfo">
        Contract Info
        <div slot="content">
          <div>
            <label>Contract Address:</label>
            0x2dd1AAc829e03d866185D8acDfB1EB20690516Af
          </div>
          <div>
            <label>Transaction hash:</label>
            0x521a7138de7f44effb5c89442f557ad9fa52416e2a47ba982dea9268c247c899
          </div>
          <div>
            <label>Blockchain Chain Network:</label>
            Ropsten
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