<template>
  <Card class="contract-info-container">
    <Collapse style="width: 100%">
      <Panel name="contractInfo">
        Contract Info
        <div slot="content">
          <div>
            <label>Contract Address:</label>
            0x920fC75Ed48EDA7E5DfcFf7a8bBe806b4E1527e9
          </div>
          <div>
            <label>Transaction hash:</label>
            -
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
  name: "GCContractCardContainer",
  components:{
    SourceCode,
    WriteFunction,
    ReadFunction,
  }
}
</script>

<style scoped>

</style>