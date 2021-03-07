<template>
  <div class="page-container">
    <h1 class="page-title">Wallet Manager</h1>
    <span class="card-container">
      <Card class="card-content">
        <br>
        <div class="row">
          <label>Public Key: </label>
        {{this.publicKey}}
        </div>
        <br>
        <div class="row">
          <label>Game Chain Gas Amount: </label>
          {{this.childGasBalance}}
        </div>
        <br>
        <div class="row">
          <label>Public Chain Ether: </label>
          {{this.homeGasBalance}}
        </div>
        <br>
      </Card>
      <div style="display: inline-flex; width: 100%; height: 40px;">
        <Button type="success" class="button" @click="removeKeyHandler">Remove Key</Button>
        <Button class="button" @click="setKeyHandler">Set Key</Button>
        <Button class="button" @click="exportPrivateKeyHandler">Export Private Key</Button>
      </div>
    </span>

    <Modal
        v-model="setKeyShowDialog"
        title="Setting Private Key"
        @on-ok="setKeySubmit"
        ok-text="OK"
        cancel-text="">
      <label>Private Key:</label>
      <input type="text" v-model="privateKeyInput"></input>
      <br>
      <br>
<!--      <p style="color: red" v-show="privateKey != null || privateKey !=''">{{this.warning}}</p>-->
      <p style="color: red">{{this.warning}}</p>
    </Modal>

    <Modal
        v-model="exportKeyShowDialog"
        title="Private Key"
        ok-text="OK"
        cancel-text="">
      <br>
      <div style="width: 90%; word-wrap: break-word;">
        <p>{{this.privateKey}}</p>
      </div>
      <br>
    </Modal>
  </div>
</template>

<script>
import {utilConfig} from "@/scripts/web3Util/config";
import {web3Util} from "@/scripts/web3Util/web3Util";
import {vm} from "@/main";

export default {
  name: "walletManager",
  data() {
    return {
      publicKey:"",
      setKeyShowDialog:false,
      privateKeyInput:"",
      warning:"",
      homeGasBalance:null,
      childGasBalance:null,
      exportKeyShowDialog:false,
      privateKey:""
    }
  },
  mounted() {
    if (localStorage.getItem('privateKey')!=null){
      this.publicKey = localStorage.getItem('address');
      this.getGameChainGasAmount();
      this.getHomeChainGasAmount();
    }
  },
  methods:{
    setKeyHandler(){
      this.setKeyShowDialog = true;
      if (localStorage.getItem('privateKey')!=="" && localStorage.getItem('privateKey')!=null){
        this.warning = "The registered private key will be covered by the new private key";
      }
    },
    setKeySubmit(){
      web3Util.privateKeyToPublicKey(this.privateKeyInput).then((resolve)=>{
        localStorage.setItem('address', resolve.address);
        localStorage.setItem('privateKey',resolve.privateKey);
        this.privateKeyInput="";
        this.refreshBalance();
      });
    },
    removeKeyHandler(){
      this.warning=""; //todo: deal with the warning logic
      localStorage.setItem('address', "");
      localStorage.setItem('privateKey',"");
      this.refreshBalance();
      this.$Message.success("Success to Remove Key");
    },
    getHomeChainGasAmount(){
      if(localStorage.getItem('address')!=null && localStorage.getItem('address')!=""){
        web3Util.checkHomeChainBalance(localStorage.getItem('address')).then((resolved) => {
          this.homeGasBalance = resolved/(Math.pow(10,18));
        })
      }
    },
    getGameChainGasAmount(){
      if(localStorage.getItem('address')!=null && localStorage.getItem('address')!=""){
        web3Util.checkChildChainBalance(localStorage.getItem('address')).then((resolved) => {
          // alert(resolved/(Math.pow(10,18)));
          this.childGasBalance = resolved/(Math.pow(10,18));
        })
      }
    },
    refreshBalance(){
      this.childGasBalance = "";
      this.homeGasBalance = "";
      this.publicKey = "";
      this.publicKey = localStorage.getItem('address');
      this.getHomeChainGasAmount();
      this.getGameChainGasAmount();
      vm.$emit('allBalanceUpdate');
    },
    exportPrivateKeyHandler(){
      this.exportKeyShowDialog = true;
      this.privateKey = localStorage.getItem('privateKey');
    }
  }
}
</script>

<style scoped>
  .card-container {
    width: 70%;
    display: flex;
    flex-direction: column;
  }

  .row {
    width: 100%;
  }

  .card-content {
    padding-left: 10%;
  }

  .button {
    display: inline-block;
    height: 100%;
    flex: 1 100%;
    margin: 1%;
  }

  label {
    margin-right: 3%;
  }

  input {
    width: 60%
  }

</style>