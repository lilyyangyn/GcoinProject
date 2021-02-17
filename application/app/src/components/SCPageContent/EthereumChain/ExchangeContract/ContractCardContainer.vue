<template>
  <Card class="contract-info-container">
    <Collapse style="width: 100%">
      <Panel name="contractInfo">
        Contract Info
        <div slot="content">
          <div>
            <label>Contract Address:</label>
            0xb9Ed6B7c16E4300BB8793daDD632dc39eD2Db119
          </div>
          <div>
            <label>Transaction hash:</label>
            0x374c42874ed00d29830fcd67f61c1a004d949c479af56110e7d81173d67f2859
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
  name: "ExchangeContractCardContainer",
  components:{
    SourceCode,
    WriteFunction,
    ReadFunction,
  }
}
</script>

<style scoped>

</style>