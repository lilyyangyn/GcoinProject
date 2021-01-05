import GcoinArtifact from "../../../build/contracts/Gcoin.json";
import { vm } from "../main.js";

const Gcoin = {
	web3: vm.web3,
	account: null,
	meta: null,

	version: "1.0.0",

	start: async function() {		
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
			
			console.log("Connected to contract 'Gcoin' successfully.");
		} catch (error) {
			console.error("Could not connect to contract.");
		}
	},

/*
	name: async function() {
		const { name } = this.meta.methods;
		const contractName = await name().call();
		
		// update page
	},

	symbol: async function() {
		const { symbol } = this.meta.methods;
		const contractSymbol = await name().call();
		
		// update page
	},

	decimals: async function() {
		const { decimals } = this.meta.methods;
		const contractDecimals = await decimals().call();
		
		// update page
	},

	totalSupply: async function() {
		const { totalSupply } = this.meta.methods;
		const supply = await totalSupply().call();
		
		// update page
	},

	balanceOf: async function() {
		const owner = document.getElementById("balance-owner").value;
		const { balanceOf } = this.meta.methods;
		balance = await balanceOf(owner).constall();
		const balance = await balanceOf(owner).call();
		
		// update page
	},

*/


	transfer: async function(callback) {
		const to = document.getElementById("transfer-to").value;
		const value =  parseInt(document.getElementById("transfer-value").value);

		const { transfer } = this.meta.methods;
		transfer(to, value).send({from:this.account}, callback);
	},

	transferFrom: async function(callback) {
		const from = document.getElementById("delegate-from").value;
		const to = document.getElementById("delegate-to").value;
		const value = parseInt(document.getElementById("delegate-value").value);

		const { transferFrom } = this.meta.methods;
		transferFrom(from, to, value).send({from:this.account}, callback);
	},

	approve: async function(callback) {
		const spender = document.getElementById("approve-spender").value;
		const value = parseInt(document.getElementById("approve-value").value);

		const { approve } = this.meta.methods;
		approve(spender, value).send({from:this.account}, callback);
	},

	getAllowanceTo: async function(callback) {
		const spender = document.getElementById("allowance-spender").value;

		this.refreshAllowance(this.account, spender, callback);
	},

	getAllowanceFrom: async function(callback) {
		const owner = document.getElementById("allowance-owner").value;

		this.refreshAllowance(owner, this.account, callback);
	},

	refreshAllowance: async function(spender, owner, callback) {
		const { allowance } = this.meta.methods;
		allowance(owner, spender).call(callback);
	},

	refreshBalance: async function(callback) {
		const { balanceOf } = this.meta.methods;
		balanceOf(this.account).call(callback);
	},

	setAccount: async function(idx) {
		const { web3 } = this;
		
		const accounts = await web3.eth.getAccounts();
		if (idx <= accounts.length && idx >= 0) {
			this.account = accounts[idx];
		} else {
			this.account = accounts[0];
		}
	},
}

export { Gcoin }




