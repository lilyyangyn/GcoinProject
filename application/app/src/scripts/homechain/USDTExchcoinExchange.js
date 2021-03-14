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

		if (web3Util.parentChainWeb3 == null) {
          await web3Util.homeChainWeb3Initialize();
      	}
		this.web3 = web3Util.parentChainWeb3;

		try {
			// get contract instance
			this.meta = new this.web3.eth.Contract(
				contractAbi.USDTExchcoinExchangeAbi, 
				this.contractAddr
			);
			
			console.log("Connected to contract 'USDTExchcoinExchange' successfully.");
		} catch (error) {
			console.error("Could not connect to contract 'USDTExchcoinExchange'.");
		}
	},

	exchcoinToUSDT: async function(value, confirmCallback, errorCallback) {
		await this.start();

		const tx = {
			to: this.contractAddr,
			gas: 1000000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.exchcoinToUSDT(value).encodeABI()
		};

		if (localStorage.getItem('privateKey') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            await web3Util.signTransaction(this.web3, tx, localStorage.getItem('privateKey'), null, confirmCallback, errorCallback);
        }
	},

	exchcoinToUSDTCoinDeliver: async function(confirmCallback, errorCallback) {
		await this.start();

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
            await web3Util.signTransaction(this.web3, tx, localStorage.getItem('privateKey'), null, confirmCallback, errorCallback);
        }
	},

	USDTToExchcoin: async function(value, confirmCallback, errorCallback) {
		await this.start();

		if (localStorage.getItem('privateKey') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
        	const tx = {
			to: this.contractAddr,
			gas: 1000000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.USDTToExchcoin(value).encodeABI()
		};
            await web3Util.signTransaction(this.web3, tx, localStorage.getItem('privateKey'), null, confirmCallback, errorCallback);
        }
	},

	USDTtoExchcoinCoinDeliver: async function(confirmCallback, errorCallback) {
		await this.start();

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
            await web3Util.signTransaction(this.web3, tx, localStorage.getItem('privateKey'), null, confirmCallback, errorCallback);
        }
	},

	transferPltfOwnership: async function(newOwner, confirmCallback, errorCallback) {
		await this.start();

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
            await web3Util.signTransaction(this.web3, tx, localStorage.getItem('privateKey'), null, confirmCallback, errorCallback);
        }
	},

	refreshUSDTBalance: async function(callback) {
		await this.start();

		let owner = localStorage.getItem('address');
		if (owner == null || owner == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { checkUSDTBalance } = this.meta.methods;
		await checkUSDTBalance().call({from: owner}, callback);
	},

	refreshExchcoinBalance: async function(callback) {
		await this.start();

		let owner = localStorage.getItem('address');
		if (owner == null || owner == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { checkExchcoinBalance } = this.meta.methods;
		await checkExchcoinBalance().call({from: owner}, callback);
	},

	refreshSCUSDTLedgerBalance: async function(callback) {
		await this.start();

		let owner = localStorage.getItem('address');
		if (owner == null || owner == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { checkSCUSDTLeger } = this.meta.methods;
		await checkSCUSDTLeger().call({from: owner}, callback);
	},

	refreshSCExchcoinLedgerBalance: async function(callback) {
		await this.start();

		let owner = localStorage.getItem('address');
		if (owner == null || owner == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { checkSCExchcoinLeger } = this.meta.methods;
		await checkSCExchcoinLeger().call({from: owner}, callback);
	},
}

export { USDTExchcoinExchange }




