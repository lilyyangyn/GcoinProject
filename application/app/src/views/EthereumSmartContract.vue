<template>
  <div class="page-container">
    <h1 class="page-title">Ethereum Smart Contract</h1>
    <Tabs type="card" class="SC-container">
      <TabPane label="Bridgeable Token Contract">
        <HBTCContractCardContainer></HBTCContractCardContainer>
      </TabPane>
      <TabPane label="Exchange Contract">
        <ExchangeContractCardContainer></ExchangeContractCardContainer>
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
import HBTCContractCardContainer from "../components/SCPageContent/EthereumChain/HomeBridgeableTokenContract/ContractCardContainer";
import ExchangeContractCardContainer from "../components/SCPageContent/EthereumChain/ExchangeContract/ContractCardContainer";
import BridgeContractCardContainer from "../components/SCPageContent/EthereumChain/BridgeContract/ContractCardContainer";
import BridgeStorageProxyContractCardContainer from "../components/SCPageContent/EthereumChain/BridgeProxyContract/ContractCardContainer";

export default {
  name: 'SmartContract',
  components: {
    HBTCContractCardContainer,
    ExchangeContractCardContainer,
    BridgeContractCardContainer,
    BridgeStorageProxyContractCardContainer,
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