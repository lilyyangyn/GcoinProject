import USDTSArtifact from "../../../parentchain/imported_abi/USDTS.json";

const USDTS = {
	web3: null,
	account: null,
	spenderAddr: null,
	meta: null,

	version: "1.0.0",

	connectToWeb3: function() {
		this.web3 = new Web3(
			new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/7abfcd3ee73b406ea84fd1bb5f10a45d"),
		);
		console.log("Connedcted to Ropsten successfully")
	}

	start: async function() {		
		const { web3 } = this;

		try {
			// get contract instance
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = USDTSArtifact.networks[networkId];
			this.meta = new web3.eth.Contract(
				USDTSArtifact.abi, 
				deployedNetwork.address,
			);

			// get account
			this.setAccount(0);
			
			console.log("Connected to contract 'USDTS' successfully.");
		} catch (error) {
			console.error("Could not connect to contract 'USDTS'.");
		}
	},

	deposit: async function(sponsor, value, callback) {
		const { transfer } = this.meta.methods;
		transfer(account_parent, value).send({from:sponsor}, callback);
	},

	approve: async function(value, callback) {
		const value = parseInt(document.getElementById("approve-value").value);

		const { approve } = this.meta.methods;
		approve(this.spenderAddr, value).send({from:this.account}, callback);
	},

	refreshAllowance: async function(callback) {
		const { allowance } = this.meta.methods;
		allowance(this.account, this.spenderAddr).call(callback);
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

export { USDTS }




