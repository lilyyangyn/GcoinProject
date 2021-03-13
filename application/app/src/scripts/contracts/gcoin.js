import GcoinArtifact from "../../../../childchain/build/contracts/Gcoin.json";

const Gcoin = {
	web3: null,
	meta: null,
	contractAddr: null, /* TODO */

	start: async function(web3) {	
		if (this.web3 != null && this.meta != null) {
			return;
		}
				
		this.web3 = web3;

		try {
			// get contract instance
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = GcoinArtifact.networks[networkId];
			this.meta = new web3.eth.Contract(
				GcoinArtifact.abi, 
				deployedNetwork.address,
			);
			
			console.log("Connected to contract 'Gcoin' successfully.");
		} catch (error) {
			console.log(error);
			console.error("Could not connect to contract 'Gcoin'.");
		}
	},

	transfer: async function(to, value, callback) {
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
            web3Util.signTransaction(this.web3, tx, callback, localStorage.getItem('privateKey'));
        }
	},

	approve: async function(spender, value, callback) {
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
            web3Util.signTransaction(this.web3, tx, callback, localStorage.getItem('privateKey'));
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




