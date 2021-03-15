import GcoinArtifact from "../../../../childchain/build/contracts/Gcoin.json";

const Gcoin = {
	web3: null,
	meta: null,
	contractAddr: utilConfig.homeChainContractAddress.Gcoin, 

	start: async function(web3) {	
		if (this.web3 != null && this.meta != null) {
			return;
		}
				
		this.web3 = web3;

		try {
			// get contract instance
			this.meta = new this.web3.eth.Contract(
				contractAbi.GcoinAbi, 
				this.contractAddr
			);
			
			console.log("Connected to contract 'Gcoin' successfully.");
		} catch (error) {
			console.log(error);
			console.error("Could not connect to contract 'Gcoin'.");
		}
	},

	transfer: async function(to, value, comfirmCallback, errorCallback) {
		const tx = {
			to: this.contractAddr,
			gas: 100000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.transfer(to, value).encodeABI()
		};

		if (localStorage.getItem('privateKey') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            web3Util.signTransaction(this.web3, tx, localStorage.getItem('privateKey'), resolveCallback, errorCallback);
        }
	},

	approve: async function(spender, value, comfirmCallback, errorCallback) {
		const tx = {
			to: this.contractAddr,
			gas: 100000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.approve(spender, value).encodeABI()
		};

		if (localStorage.getItem('privateKey') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            web3Util.signTransaction(this.web3, tx, localStorage.getItem('privateKey'), resolveCallback);
        }
	},

	allowance: async function(spender, callback) {
		let owner = localStorage.getItem('address');
		if (owner == null || owner == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { allowance } = this.meta.methods;
		allowance(owner, spender).call(callback);
	},

	balance: async function(callback) {
		let owner = localStorage.getItem('address');
		if (owner == null || owner == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { balanceOf } = this.meta.methods;
		balanceOf(owner).call(callback);
	},
}

export { Gcoin }




