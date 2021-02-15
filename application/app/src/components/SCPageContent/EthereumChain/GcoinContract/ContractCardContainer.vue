<template>
  <Card class="contract-info-container">
    <Collapse style="width: 100%">
      <Panel name="contractInfo">
        Contract Info
        <div slot="content">
          <div>
            <label>Contract Address:</label>
            0x18DfB0f9B4138d70d3EFe504A4D716D483Cfa203
          </div>
          <div>
            <label>Transaction hash:</label>
            0x07e55162b5feda5decdc4948118dd231f8c1fa32823a6bd459ec0494aafe51cb
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