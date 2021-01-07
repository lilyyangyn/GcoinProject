import BridgeableTokenArtifact from "../../../../../parentchain/imported_abi/BridgeableToken.json";

const BridgeableToken = {
	web3: null,
	account: null,
	bridgeMediator: null,
	meta: null,

	version: "1.0.0",

	start: async function() {		
		const { web3 } = this;

		try {
			this.meta = new web3.eth.Contract(
				BridgeableTokenArtifact			);

			// get account
			this.setAccount(0);
			
			console.log("Connected to contract 'BridgeableToken' successfully.");
		} catch (error) {
			console.error("Could not connect to contract 'BridgeableToken'.");
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

export { BridgeableToken }




