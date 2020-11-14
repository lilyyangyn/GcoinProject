import Web3 from "web3";
import GcoinArtifact from "../build/contracts/Gcoin.json";

const Gcoin = {
	web3: null,
	account: null,
	meta: null,

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
			
		} catch (error) {
			console.error("Could not connect to contract or chain.");
		}
	},

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

	transfer: async function() {
		const to = document.getElementById("tranfer-to").value;
		const value =  parseInt(document.getElementById("tranfer-value").value);

		this.setStatus("Initiating transaction... (please wait)");

		const { transfer } = this.meta.methods;
		await transfer(to, value).call();

		this.setStatus("Transaction complete!");
		this.refreshBalance();
	},

	transferFrom: async function() {
		const from = document.getElementById("delegate-from").value;
		const to = document.getElementById("delegate-to").value;
		const value = parseInt(document.getElementById("delegate-value").value);

		this.setStatus("Initiating transaction... (please wait)");

		const { transferFrom } = this.meta.methods;
		await transferFrom(from, to, value).call();

		this.setStatus("Transaction complete!");
		this.refreshBalance();
	},

	approve: async function() {
		const spender = document.getElementById("approve-spender").value;
		const value = parseInt(document.getElementById("approve-value").value);

		this.setStatus("Processing... (please wait)");

		const { approve } = this.meta.methods;
		await approve(spender, value).call();

		this.setStatus("Complete!");
	},

	allowance: async function() {
		const spender = document.getElementById("allowance-spender").value;
		const owner = document.getElementById("allowance-owner").value;

		const { allowance } = this.meta.methods;
		await allowance(owner, spender).call();
	},

	refreshBalance: async function() {
		const { balanceOf } = this.meta.methods;
		const balance = await balanceOf(this.account).call();

		// update page
		const balanceElements = document.getElementsById("balance");
		balanceElements.innerHTML = balance;
	},

	setAccount: async function(idx) {
		const accounts = await web3.eth.getAccounts();
		if (idx <= accounts.length && idx >= 0) {
			this.account = accounts[idx];
		} else {
			this.account = accounts[0];
		}
	},

	setStatus: function(message) {
		// update page
		const status = document.getElementById("status");
		status.innerHTML = message;
	},

}

window.addEventListner("load", function() {
	Gcoin.web3 = new Web3(
		new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
	);

	Gcoin.start();
})


