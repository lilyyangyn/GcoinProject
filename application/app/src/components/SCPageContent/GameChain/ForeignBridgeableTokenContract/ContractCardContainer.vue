<template>
  <Card class="contract-info-container">
    <Collapse style="width: 100%">
      <Panel name="contractInfo">
        Contract Info
        <div slot="content">
          <div>
            <label>Contract Address:</label>
            0x60Fc1c7347b7D52aB28401311e49e22845C6706E
          </div>
          <div>
            <label>Transaction hash:</label>
            0xc2632fe23c67e57e2bf92731bc7bec6b06802ad448d3546edd1282286617d7b4
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
      <Panel name="readContract">
        Read Contract
        <div slot="content">
          <ReadFunction></ReadFunction>
        </div>
      </Panel>
      <Panel name="writeContract">
        Write Contract
        <div slot="content">
          <WriteFunction></WriteFunction>
        </div>
      </Panel>
    </Collapse>
  </Card>
</template>

<script>


import WriteFunction from "./WriteFunction";
import SourceCode from "./SourceCode";
import ReadFunction from "./ReadFunction";

export default {
  name: "FBTCContractCardContainer",
  components:{
    SourceCode,
    WriteFunction,
    ReadFunction,
  }
}
</script>

<style scoped>

</style>