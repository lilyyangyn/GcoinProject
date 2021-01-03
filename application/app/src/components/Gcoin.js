import GcoinArtifact from "../../../build/contracts/Gcoin.json";
import Vue from 'vue'
import Component from 'vue-class-component'
import Web3 from "web3";

@Component
export default class Gcoin extends Vue {
  web3 = undefined
  account = undefined
  meta = undefined

  version = "1.0.0"

  async start() {
    this.$web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
    );

    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = GcoinArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        GcoinArtifact.abi, 
        deployedNetwork.address,
      );

      // get account
      this.setAccount(0);
      
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  }

  async transfer() {
    const to = document.getElementById("transfer-to").value;
    const value =  parseInt(document.getElementById("transfer-value").value);

    this.setStatus("Initiating transaction... (please wait)");

    const { transfer } = this.meta.methods;
    transfer(to, value).send({from:this.account}).then(() => {
        this.setStatus("Transaction complete!");
        this.refreshBalance();
      }).catch((error) => {
        this.setStatus(error.message.substring(66));
        this.refreshBalance();
      }); 
  }

  async transferFrom() {
    const from = document.getElementById("delegate-from").value;
    const to = document.getElementById("delegate-to").value;
    const value = parseInt(document.getElementById("delegate-value").value);

    this.setStatus("Initiating transaction... (please wait)");

    const { transferFrom } = this.meta.methods;
    transferFrom(from, to, value).send({from:this.account}).then(() => {
        this.setStatus("Transaction complete!");
        this.refreshBalance();
      }).catch((error) => {
        this.setStatus(error.message.substring(66));
        this.refreshBalance();
      });
  }

  async approve() {
    const spender = document.getElementById("approve-spender").value;
    const value = parseInt(document.getElementById("approve-value").value);

    this.setStatus("Processing... (please wait)");

    const { approve } = this.meta.methods;
    approve(spender, value).send({from:this.account}).then(() => {
        this.setStatus("Approved!");
      }).catch((error) => {
        this.setStatus(error.message.substring(66));
      });
  }

  async getAllowanceTo() {
    const spender = document.getElementById("allowance-spender").value;

    this.allowance(this.account, spender);
  }

  async getAllowanceFrom() {
    const owner = document.getElementById("allowance-owner").value;

    this.allowance(owner, this.account);
  }

  async allowance(spender, owner) {
    const { allowance } = this.meta.methods;
    allowance(owner, spender).call().then((allowed) => {
      const allowedElement = document.getElementById("allowed");
      allowedElement.innerHTML = allowed;
    }).catch((error) => {
      this.popMsg("Fail to get allowance amount.", error);
    });
  }

  async refreshBalance() {
    const { balanceOf } = this.meta.methods;
    balanceOf(this.account).call().then((balance) => {
      const balanceElement = document.getElementById("balance");
      balanceElement.innerHTML = balance;
    }).catch((error) => {
      this.popMsg("Fail to get balance.", error);
    });
  }

  async setAccount(idx) {
    const { web3 } = this;
    
    const accounts = await web3.eth.getAccounts();
    if (idx <= accounts.length && idx >= 0) {
      this.account = accounts[idx];
    } else {
      this.account = accounts[0];
    }
  }

  setStatus(message) {
    const status = document.getElementById("status");
    if (status) {
      status.innerHTML = message;
    }
  }

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
  }
  
}