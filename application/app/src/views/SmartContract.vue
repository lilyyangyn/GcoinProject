<template>
  <div class="page-container">
    <h1 class="title">Smart Contract</h1>
    <Tabs type="card" class="SC-container">
      <TabPane label="Gcoin Contract">
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
                <GcoinSourceCode></GcoinSourceCode>
              </div>
            </Panel>
            <Panel name="readContract">
              Read Contract
              <div slot="content">
                <GcoinWriteFunction></GcoinWriteFunction>
              </div>
            </Panel>
            <Panel name="4">
              Write Contract
              <div slot="content">
                <GcoinWriteFunction></GcoinWriteFunction>
              </div>
            </Panel>
          </Collapse>
        </Card>
      </TabPane>
      <TabPane label="Transfer">
        <Trans />
      </TabPane>
      <TabPane label="Node Register">
        <Regist />
      </TabPane>
      <TabPane label="Another Smart Contract">

      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import GcoinSourceCode from "../components/SCPageContent/GcoinSourceCode";
import GcoinWriteFunction from "../components/SCPageContent/GcoinWriteFunction";
import Trans from "./Transfer.vue";
import Regist from "./NodeRegister.vue";

export default {
  name: 'SmartContract',
  
  data () {
    return {
      formGameLaunch : {
        amount:'',
        address:'',
        paymentMethod:''
      },
      formStableCoinBuyGcoin :{
        amount:'',
        address:''
      }
    }
  },
  components: {
    GcoinSourceCode,
    GcoinWriteFunction,
    Trans,
    Regist,
  },
  methods: {

  }
}
</script>

<style>
/*.page-container {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  align-items: center;*/
/*}*/

.SC-container {
  width: 80%;
  /*display: flex;*/
  /*flex-direction: column;*/
}

.source-code-container {
  height: 300px;
  overflow: scroll;
}

.contract-info-container {
  width:100%;
  max-height: 550px;
  /*height: 550px;*/
  overflow: scroll;
}

label{
  font-weight: bold;
}

</style>