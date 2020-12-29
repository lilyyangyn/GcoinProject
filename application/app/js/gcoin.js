import Web3 from "web3";
import GcoinArtifact from "../../build/contracts/Gcoin.json";

export const Gcoin = {
	web3: null,
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
			
		} catch (error) {
			console.error("Could not connect to contract or chain.");
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


	transfer: function() {
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
	},

	transferFrom: async function() {
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
	},

	approve: async function() {
		const spender = document.getElementById("approve-spender").value;
		const value = parseInt(document.getElementById("approve-value").value);

		this.setStatus("Processing... (please wait)");

		const { approve } = this.meta.methods;
		approve(spender, value).send({from:this.account}).then(() => {
				this.setStatus("Approved!");
			}).catch((error) => {
				this.setStatus(error.message.substring(66));
			});
	},

	getAllowanceTo: async function() {
		const spender = document.getElementById("allowance-spender").value;

		this.allowance(this.account, spender);
	},

	getAllowanceFrom: async function() {
		const owner = document.getElementById("allowance-owner").value;

		this.allowance(owner, this.account);
	},

	allowance: async function(spender, owner) {
		const { allowance } = this.meta.methods;
		allowance(owner, spender).call().then((allowed) => {
			const allowedElement = document.getElementById("allowed");
			allowedElement.innerHTML = allowed;
		}).catch((error) => {
			this.popMsg("Fail to get allowance amount.", error);
		});
	},

	refreshBalance: async function() {
		const { balanceOf } = this.meta.methods;
		balanceOf(this.account).call().then((balance) => {
			const balanceElement = document.getElementById("balance");
			balanceElement.innerHTML = balance;
		}).catch((error) => {
			this.popMsg("Fail to get balance.", error);
		});
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

	setStatus: function(message) {
		// update page
		const status = document.getElementById("status");
		if (status) {
			status.innerHTML = message;
		}
	},

	popMsg: function(message, error) {
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


export function handler(){
	console.log("window.addEventListener");
	Gcoin.web3 = new Web3(
		new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
	);

	Gcoin.start();
}




