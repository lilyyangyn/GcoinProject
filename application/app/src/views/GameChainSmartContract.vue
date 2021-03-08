<template>
  <div class="page-container">
    <h1 class="page-title">Ethereum Smart Contract</h1>
    <Tabs type="card" class="SC-container">
      <TabPane label="Gcoin Contract">
        <GCContractCardContainer></GCContractCardContainer>
      </TabPane>
      <TabPane label="Bridgeable Token Contract">
        <FBTCContractCardContainer></FBTCContractCardContainer>
      </TabPane>
      <TabPane label="Bridge Storage Proxy Contract">
        <BridgeStorageProxyContractCardContainer></BridgeStorageProxyContractCardContainer>
      </TabPane>
      <TabPane label="Bridge Contract">
        <BridgeContractCardContainer></BridgeContractCardContainer>
      </TabPane>

<!--      <TabPane label="Transfer">-->
<!--        <Trans />-->
<!--      </TabPane>-->
<!--      <TabPane label="Node Register">-->
<!--        <Regist />-->
<!--      </TabPane>-->
<!--      <TabPane label="Another Smart Contract">-->

<!--      </TabPane>-->
    </Tabs>
  </div>
</template>

<script>
import Trans from "./Transfer.vue";
import Regist from "./NodeRegister.vue";
import GCContractCardContainer from "../components/SCPageContent/GameChain/GcoinContract/ContractCardContainer";
import FBTCContractCardContainer from "../components/SCPageContent/GameChain/ForeignBridgeableTokenContract/ContractCardContainer";
import BridgeStorageProxyContractCardContainer from "../components/SCPageContent/GameChain/BridgeProxyContract/ContractCardContainer";
import BridgeContractCardContainer from "../components/SCPageContent/GameChain/BridgeContract/ContractCardContainer";

export default {
  name: 'SmartContract',
  components: {
    GCContractCardContainer,
    FBTCContractCardContainer,
    BridgeStorageProxyContractCardContainer,
    BridgeContractCardContainer,
    Trans,
    Regist,
  },
}
</script>

<style>

.SC-container {
  width: 85%;
  /*display: flex;*/
  /*flex-direction: column;*/
}

.source-code-container {
  height: 300px;
  width: 100%;
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