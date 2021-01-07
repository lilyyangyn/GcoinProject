import BridgealeTokenArtifact from "../../../parentchain/imported_abi/BridgealeToken.json";

const BridgealeToken = {
	web3: null,
	account: null,
	bridgeMediator: null,
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
			const deployedNetwork = BridgealeTokenArtifact.networks[networkId];
			this.meta = new web3.eth.Contract(
				BridgealeTokenArtifact.abi, 
				deployedNetwork.address,
			);

			// get account
			this.setAccount(0);
			
			console.log("Connected to contract 'BridgealeToken' successfully.");
		} catch (error) {
			console.error("Could not connect to contract 'BridgealeToken'.");
		}
	},

	transferToChildChain: async function(value, callback) {
		const { transferAndCall } = this.meta.methods;
		transferAndCall(this.bridgeMediator, value, '0x').send({from:this.account}, callback);
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

export { BridgealeToken }




