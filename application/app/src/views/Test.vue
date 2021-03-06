<template>
  <div class="game-container">
    <button @click="onClickHandle1()">click</button>
    <button @click="onClickHandle2()">click2</button>
    <button @click="onClickHandle3()">click3</button>
    <button @click="onClickHandle4()">click4</button>
  </div>
</template>

<script>


import {web3Util} from "@/scripts/web3Util/web3Util";
import home from "@/views/Home";
import {vm} from "@/main";

export default {
  // props:{updateFunction: {type: Function}},
  data() {
    return {
      name: null,
    }
  },
  mounted() {

  },
  methods: {
    onClickHandle1() {
      console.log("setting local storage");
      localStorage.setItem("privateKey", "abc");
      console.log("setting local storage private key: ", localStorage.getItem("privateKey"))
    },
    onClickHandle2() {
      console.log("setting local storage private key: ", localStorage.getItem("privateKey"))
    },
    onClickHandle3() {
      if (web3Util.web3 == null) {
        try {
          web3Util.homeChainWeb3Initialize();
        } catch (e) {
          console.log(e)
          return
        }
      }
      // web3Util.getUSDTFromFaucet();
      web3Util.getUserUSDTBalance();
    },
    onClickHandle4() {
      // console.log(this.$refs);
      // home.data().coinBalance.USDTBalance = "10000000";
      // home.methods.USDTBalanceUpdate();
      // this.updateFunction();
      vm.$emit('balanceUpdate',"500000");
    },

  }
}
</script>

<style>
.game-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.game-thumbnail {
  margin-right: 1%;
  margin-bottom: 1%;
}
</style>
