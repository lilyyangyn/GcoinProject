import {contractAbi} from "@/scripts/web3Util/contractAbi";
import {utilConfig} from "@/scripts/web3Util/config";
import {web3Util} from "@/scripts/web3Util/web3Util"

const GcoinExchcoinExchange = {
	web3: null, 
	meta: null,
	contractAddr: utilConfig.childChainContractAddress.Gcoin_Exchcoin_Exchange,

	start: async function() {
		if (this.web3 != null && this.meta != null) {
			return;
		}

		if (web3Util.childChainWeb3 == null) {
			await web3Util.childChainWeb3Initialize()
		}
		this.web3 = web3Util.childChainWeb3;

		try {
			this.meta = new this.web3.eth.Contract(
				contractAbi.GcoinExchcoinExchangeAbi, 
				this.contractAddr
			);

			console.log("Connected to contract 'GcoinExchcoinExchange' successfully.");
		} catch (error) {
			console.error("Could not connect to contract 'GcoinExchcoinExchange'.");
		}
	},

	exchcoinToGcoin: async function(value, confirmCallback, errorCallback) {
		await this.start();

		const tx = {
			to: this.contractAddr,
			gas: 1000000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.exchcoinToGcoin(value).encodeABI()
		}

		web3Util.signTransactionWithLocalKey(this.web3, tx, null, confirmCallback, errorCallback);
	},

	GcoinToExchcoin: async function(value, confirmCallback, errorCallback) {
		await this.start();

		const tx = {
			to: this.contractAddr,
			gas: 1000000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.GcoinToExchcoin(value).encodeABI()
		}

		web3Util.signTransactionWithLocalKey(this.web3, tx, null, confirmCallback, errorCallback);
	},

	registerCompany: async function(companyAddr, register, confirmCallback, errorCallback) {
		await this.start();

		const tx = {
			to: this.contractAddr,
			gas: 1000000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.registerCompany(companyAddr, register).encodeABI()
		}

		web3Util.signTransactionWithLocalKey(this.web3, tx, null, confirmCallback, errorCallback);
	},

	checkSelfRegister: async function(callback) {
		await this.start();

		let owner = localStorage.getItem('address');
		if (owner == null || owner == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { companyList } = this.meta.methods;
		await companyList(owner).call({from: owner}, callback);
	},

	refreshGcoinBalance: async function(callback) {
		await this.start();

		let owner = localStorage.getItem('address');
		if (owner == null || owner == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { checkGcoinBalance } = this.meta.methods;
		await checkGcoinBalance().call({from: owner}, callback);
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

	refreshSCGcoinLedgerBalance: async function(callback) {
		await this.start();

		let owner = localStorage.getItem('address');
		if (owner == null || owner == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { checkSCGcoinLedger } = this.meta.methods;
		await checkSCGcoinLedger().call({from: owner}, callback);
	},

	refreshSCExchcoinLedgerBalance: async function(callback) {
		await this.start();

		let owner = localStorage.getItem('address');
		if (owner == null || owner == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { checkSCExchcoinLedger } = this.meta.methods;
		await checkSCExchcoinLedger().call({from: owner}, callback);
	},	
}

export {GcoinExchcoinExchange}