<template>
  <div class="game-container">
    <button @click="onClickHandle1()">click</button>
    <button @click="onClickHandle2()">click2</button>
    <button @click="onClickHandle3()">click3</button>
    <button @click="onClickHandle4()">click4</button>

    <button @click="onClickHandle5()">click5</button>
    <button @click="onClickHandle6()">click6</button>
    <button @click="onClickHandle7()">click7</button>
<<<<<<< HEAD
    <button @click="homeTransferAndCallHandle()">click8</button>
<!--    <button @click="handle8Callback()">click9</button>-->
    <button @click="onClickHandle10()">click10</button>
=======
    <button @click="onClickHandle8()">click8</button>
>>>>>>> a6980c99fa78f85ed7223a52d8e352f0b43be49f
  </div>
</template>

<script>


import {web3Util} from "@/scripts/web3Util/web3Util";
import home from "@/views/Home";
import {vm} from "@/main";
import {USDTS} from "@/scripts/homechain/USDTS"
import {USDTExchcoinExchange} from "@/scripts/homechain/USDTExchcoinExchange"
import {BridgeableToken} from "@/scripts/homechain/BridgeableToken"

export default {
  // props:{updateFunction: {type: Function}},
  data() {
    return {
      name: null,
      encodeData: null,
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
      USDTS.refreshBalance((err, res) => console.log("USDTBalance: "+ res));
      USDTS.refreshAllowance((err, res) => console.log("USDTAllowance: "+res));

      USDTExchcoinExchange.refreshExchcoinBalance((err, res) => console.log("ExchcoinBalance: "+res))
      USDTExchcoinExchange.refreshSCUSDTLedgerBalance((err, res) => console.log("USDTLedgerBalance: "+res))
    },

    async onClickHandle6() {
      USDTS.approve(0, (resolved) => {
        console.log("TESTING-TESTING-TESTING-TESTING");
        console.log(resolved);
      });
    },
    async onClickHandle7() {
      USDTExchcoinExchange.USDTToExchcoin(1, (err, res) => console.log(err));
    },
<<<<<<< HEAD
    onClickHandle10() {
      // let encodeData = "0x00050000249bfc2f3cc8d68f6b6bf7230ea0a8ed853de73100000000000003f4194f052528d5fbbed085004c6451ef116dd61173ae3e850013d4045709610893156175354340bb190007a1200101004d2a8b6c03540000000000000000000000002f56b78d2d3b5ef6fdf0a6c2415089909496c646000000000000000000000000000000000000000000000000000000000000000a";
      // web3Util.getSignature(encodeData).then((resolved) => {console.log(resolved)});

      let encodeData = "0x00050000249bfc2f3cc8d68f6b6bf7230ea0a8ed853de73100000000000003f4194f052528d5fbbed085004c6451ef116dd61173ae3e850013d4045709610893156175354340bb190007a1200101004d2a8b6c03540000000000000000000000002f56b78d2d3b5ef6fdf0a6c2415089909496c646000000000000000000000000000000000000000000000000000000000000000a";
      let signature = "0x011b1b388fecfa13d49a083a5b155dabc339e72e41820cd587898e1d99627f9e848435e2c5f8890d654c40c9fcd6d4a4d20109795f44a6b1920eac33dfce8dba81ba";
      web3Util.signExecute(encodeData,signature);
      // web3Util.test().then(result => {
      //   console.log(result);
      // });

    },
    //*** transfer and call handle function: line 107 - line 148 ***

    homeTransferAndCallHandle() {
      web3Util.transferAndCall(10,this.transferAndCallCallback).then((resolved) => {
      });
    },

    async transferAndCallCallback(resolved){
      //trim the message with signature request
      let data = resolved.logs[4].data;
      let topic1 = resolved.logs[4].topics[1].slice(2);
      let topic1Index = data.indexOf(topic1);
      let encodeData = "0x" + data.slice(topic1Index,data.length-22);
      console.log("encode data: "+encodeData);

      //get signature
      let signature = null;
      while(signature == null){
        console.log("while looping up");
        // periodically asking for signature by sleeping the thread
        await new Promise(resolve => setTimeout(resolve, 15000));
        console.log("finish sleep");
        await web3Util.getSignature(encodeData).then((resolved) => {
          console.log("resolved: " + encodeData);
          signature = resolved;
          console.log(signature);
        }).catch(error => {
          console.log(error);
        });
      }

      //pass the signature and message to the chain
      await web3Util.signExecute(encodeData, signature, this.signExecuteCallback).then((resolved) => {

      }).catch(error => {
        console.log(error);
      });
    },

    signExecuteCallback(resolved){

    },


    sleep(milliseconds) {
      // const start = Date.now();
      // while (Date.now() - start < milliseconds);
      new Promise(resolve => setTimeout(resolve, milliseconds))
    }
=======
    async onClickHandle8() {
      BridgeableToken.transferToChildChain(1, (err, res) => console.log(err));
    },
>>>>>>> a6980c99fa78f85ed7223a52d8e352f0b43be49f

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
