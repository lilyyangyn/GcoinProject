<template>
  <Collapse accordion simple>
    <Panel name="approveFunction">
      Approve
      <!-- <div slot="content">
        <label>spender</label>
        <input type="text"></input>
        <label>value</label>
        <input type="text"></input>
        <Button type="success">write</Button>
      </div> -->
      <div slot="content">
      <label>spender</label>
      <input type="text" placeholder="" id="approve-spender">
      <label>value</label>
      <input type="text" placeholder="" id="approve-value">
      <Button type="success" @click="initiateTx(gcoin.approve(callbackShowResult))">write</Button>

    </div>
    </Panel>
    <Panel name="transferFunction">
      Transfer
      <div slot="content">
        <label>address_to</label>
        <input type="text"></input>
        <label>value</label>
        <input type="text"></input>
        <Button type="success" @click="initiateTx(gcoin.transfer(callbackUpdateStatus))">write</Button>
      </div>
    </Panel>
    <Panel name="transferFromFunction">
      Transfer_From
      <div slot="content">
        <label>address_from</label>
        <input type="text"></input>
        <label>address_to</label>
        <input type="text"></input>
        <label>value</label>
        <input type="text"></input>
        <Button type="success" @click="initiateTx(gcoin.transferFrom(callbackUpdateStatus))">write</Button>
      </div>
    </Panel>
  </Collapse>
</template>

<script>
import { Gcoin } from '@/scripts/contracts/gcoin.js';
  export default {
    name: "WriteFunction",

    methods: {

      initiateTx(transaction) {
        this.setStatus("Initiate Transaction. Please wait...");
        transaction;
      },

      /* UI Methods */

      setStatus(message) {
        const status = document.getElementById("status");
        if (status) {
          status.innerHTML = message;
          if (status.style['visibility'] != 'visible') {
            status.style.visibility = 'visible';
          }
        }
      },

      popMsg(message, error) {
        // TODO
        const popTitle = document.getElementById("popTitle");
        if (popTitle) {
          popTitle.innerHTML = message;
        }
        
        const popDetail = document.getElementById("popDetail");
        if (popDetail) {
          popDetail.innerHTML = error;
        }
      },

      updateBalance(result) {
        const balanceElement = document.getElementById("balance");
        balanceElement.innerHTML = result;
      },

      /* UI Callback  */

      callbackUpdateStatus(error) {
        if (!error) {
          this.setStatus("Transaction complete!");
          this.updateBalance(Gcoin.balance);
        } else {
          this.setStatus(error.message.substring(66));
          Gcoin.refreshBalance(this.callbackRefreshBalance);
        }
      },

      callbackShowResult(error) {
        if (!error) {
          this.setStatus("Approved!");
        } else {
          this.setStatus(error.message.substring(66));
        }
      },

      callbackRefreshBalance(error, result) {
        if (!error) {
          this.updateBalance(result);
        } else {
          this.popMsg("Fail to get balance.", error);
        }
        
      },

      callbackRefreshAllowence(error, result) {
        if (!error) {
          const balanceElement = document.getElementById("allowed");
          balanceElement.innerHTML = result;
        } else {
          this.popMsg("Fail to get balance.", error);
        }
        
      }

    },

    created(){
      this.gcoin = Gcoin;
    },

  }
</script>

<style scoped>
label {
  margin-right: 2%;
  font-weight: initial;
}

input {
  margin-right: 4%;
}
</style>