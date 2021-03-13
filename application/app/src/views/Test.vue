<template>
  <div class="game-container">
    <button @click="onClickHandle1()">click</button>
    <button @click="onClickHandle2()">click2</button>
    <button @click="onClickHandle3()">click3</button>
    <button @click="onClickHandle4()">click4</button>

    <button @click="onClickHandle5()">click5</button>
    <button @click="onClickHandle6()">click6</button>
    <button @click="onClickHandle7()">click7</button>
  </div>
</template>

<script>


import {web3Util} from "@/scripts/web3Util/web3Util";
import home from "@/views/Home";
import {vm} from "@/main";
import {USDTS} from "@/scripts/homechain/USDTS"
import {USDTExchcoinExchange} from "@/scripts/homechain/USDTExchcoinExchange"

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


    async onClickHandle5() {
      if (web3Util.parentChainWeb3 == null) {
        await web3Util.homeChainWeb3Initialize();
      }
      await USDTS.start(web3Util.parentChainWeb3);
      USDTS.refreshBalance((err, res) => console.log("1: "+ res));
      USDTS.refreshAllowance((err, res) => console.log("2: "+res));

      await USDTExchcoinExchange.start(web3Util.parentChainWeb3);
      USDTExchcoinExchange.refreshExchcoinBalance((err, res) => console.log("3: "+res))
      USDTExchcoinExchange.refreshUSDTBalance((err, res) => console.log("4: "+res))
      USDTExchcoinExchange.refreshSCUSDTLedgerBalance((err, res) => console.log("5: "+res))
    },

    async onClickHandle6() {
      if (web3Util.parentChainWeb3 == null) {
        await web3Util.homeChainWeb3Initialize();
      }
      await USDTS.start(web3Util.parentChainWeb3);
      USDTS.approve(10, (err, res) => console.log(res));
    },
    async onClickHandle7() {
      if (web3Util.parentChainWeb3 == null) {
        await web3Util.homeChainWeb3Initialize();
      }
      await USDTExchcoinExchange.start(web3Util.parentChainWeb3);
      USDTExchcoinExchange.USDTToExchcoin(1, (err, res) => console.log(err));
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
