import USDTExchcoinExchangeArtifact from "../../../parentchain/build/contracts/USDTExchcoinExchange.json";

const USDTExchcoinExchange = {
	web3: null,
	account: null,
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
			const deployedNetwork = USDTExchcoinExchangeArtifact.networks[networkId];
			this.meta = new web3.eth.Contract(
				USDTExchcoinExchangeArtifact.abi, 
				deployedNetwork.address,
			);

			// get account
			this.setAccount(0);
			
			console.log("Connected to contract 'USDTExchcoinExchange' successfully.");
		} catch (error) {
			console.error("Could not connect to contract 'USDTExchcoinExchange'.");
		}
	},

	exchcoinToUSDT: async function(value, callback) {
		const { exchcoinToUSDT } = this.meta.methods;
		exchcoinToUSDT(value).send({from:this.account}, callback);
	},

	exchcoinToUSDTCoinDeliver: async function(callback) {
		const { exchcoinToUSDTCoinDeliver } = this.meta.methods;
		exchcoinToUSDTCoinDeliver().send({from:this.account}, callback);
	},

	USDTToExchcoin: async function(value, callback) {
		const { USDTToExchcoin } = this.meta.methods;
		USDTToExchcoin(value).send({from:this.account}, callback);
	},

	USDTtoExchcoinCoinDeliver: async function(callback) {
		const { USDTtoExchcoinCoinDeliver } = this.meta.methods;
		USDTtoExchcoinCoinDeliver().send({from:this.account}, callback);
	},

	transferPltfOwnership: async function(newOwner, callback) {
		const { transferPltfOwnership } = this.meta.methods;
		transferPltfOwnership(newOwner).call(callback);
	},

	refreshUSDTBalance: async function(callback) {
		const { checkUSDTBalance } = this.meta.methods;
		checkUSDTBalance().call({from: this.account}, callback);
	},

	refreshExchcoinBalance: async function(callback) {
		const { checkExchcoinBalance } = this.meta.methods;
		checkExchcoinBalance().call({from: this.account}, callback);
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

export { USDTExchcoinExchange }




