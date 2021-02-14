<template>
  <div class="page-container">
    <h1 class="title">Smart Contract</h1>
    <Tabs type="card" class="SC-container">
      <TabPane label="Gcoin Contract">
        <ContractCardContainer></ContractCardContainer>
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
import Trans from "./Transfer.vue";
import Regist from "./NodeRegister.vue";
import ContractCardContainer from "../components/SCPageContent/GcoinContract/ContractCardContainer";


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
    ContractCardContainer,
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