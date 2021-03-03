<template>
  <div class="game-container">
    <button @click="onClickHandle1()">click</button>
    <button @click="onClickHandle2()">click2</button>
    <button @click="onClickHandle3()">click3</button>
  </div>
</template>

<script>


import {web3Util} from "@/scripts/web3Util/web3Util";

export default {
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
