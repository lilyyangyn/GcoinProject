import {contractAbi} from "@/scripts/web3Util/contractAbi";
import {utilConfig} from "@/scripts/web3Util/config";
import {web3Util} from "@/scripts/web3Util/web3Util"

const USDTExchcoinExchange = {
	web3: null,
	meta: null,
	contractAddr: utilConfig.homeChainContractAddress.USDT_Exchcoin_Exchange,

	start: async function() {		
		if (this.web3 != null && this.meta != null) {
			return;
		}	

		this.web3 = web3;

		try {
			// get contract instance
			this.meta = new web3.eth.Contract(
				contractAbi.USDTExchcoinExchangeAbi, 
				this.contractAddr
			);
			
			console.log("Connected to contract 'USDTExchcoinExchange' successfully.");
		} catch (error) {
			console.error("Could not connect to contract 'USDTExchcoinExchange'.");
		}
	},

	exchcoinToUSDT: async function(value, callback) {
		const tx = {
			to: this.contractAddr,
			gas: 100000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.exchcoinToUSDT(value).encodeABI()
		};

		if (localStorage.getItem('privateKey') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            web3Util.signTransaction(this.web3, tx, callback, localStorage.getItem('privateKey'));
        }
	},

	exchcoinToUSDTCoinDeliver: async function(callback) {
		const tx = {
			to: this.contractAddr,
			gas: 100000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.exchcoinToUSDTCoinDeliver().encodeABI()
		};

		if (localStorage.getItem('privateKey') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            web3Util.signTransaction(this.web3, tx, callback, localStorage.getItem('privateKey'));
        }
	},

	USDTToExchcoin: async function(value, callback) {
		const tx = {
			to: this.contractAddr,
			gas: 100000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.USDTToExchcoin(value).encodeABI()
		};

		if (localStorage.getItem('privateKey') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            web3Util.signTransaction(this.web3, tx, callback, localStorage.getItem('privateKey'));
        }
	},

	USDTtoExchcoinCoinDeliver: async function(callback) {
		const tx = {
			to: this.contractAddr,
			gas: 100000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.USDTtoExchcoinCoinDeliver().encodeABI()
		};

		if (localStorage.getItem('privateKey') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            web3Util.signTransaction(this.web3, tx, callback, localStorage.getItem('privateKey'));
        }
	},

	transferPltfOwnership: async function(newOwner, callback) {
		const tx = {
			to: this.contractAddr,
			gas: 100000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.transferPltfOwnership(newOwner).encodeABI()
		};

		if (localStorage.getItem('privateKey') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            web3Util.signTransaction(this.web3, tx, callback, localStorage.getItem('privateKey'));
        }
	},

	refreshUSDTBalance: async function(callback) {
		let owner = localStorage.getItem('address');
		if (owner == null || owner == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { checkUSDTBalance } = this.meta.methods;
		checkUSDTBalance().call({from: owner}, callback);
	},

	refreshExchcoinBalance: async function(callback) {
		let owner = localStorage.getItem('address');
		if (owner == null || owner == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { checkExchcoinBalance } = this.meta.methods;
		checkExchcoinBalance().call({from: owner}, callback);
	},

	refreshSCUSDTLedgerBalance: async function(callback) {
		let owner = localStorage.getItem('address');
		if (owner == null || owner == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { checkSCUSDTLeger } = this.meta.methods;
		checkSCUSDTLeger().call({from: owner}, callback);
	},

	refreshSCExchcoinLedgerBalance: async function(callback) {
		let owner = localStorage.getItem('address');
		if (owner == null || owner == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { checkSCExchcoinLeger } = this.meta.methods;
		checkSCExchcoinLeger().call({from: owner}, callback);
	},
}

export { USDTExchcoinExchange }




