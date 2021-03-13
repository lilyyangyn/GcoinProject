import {contractAbi} from "@/scripts/web3Util/contractAbi";
import {utilConfig} from "@/scripts/web3Util/config";
import {web3Util} from "@/scripts/web3Util/web3Util"

const USDTS = {
	web3: null,
	meta: null,
	contractAddr: utilConfig.homeChainContractAddress.USDT,
	exchangeContractAddr: utilConfig.homeChainContractAddress.USDT_Exchcoin_Exchange,

	start: async function(web3) {
		if (this.web3 != null && this.meta != null) {
			return;
		}	

		this.web3 = web3;

		try {
			this.meta = new web3.eth.Contract(
				contractAbi.USDTAbi, 
				this.contractAddr
			);
			
			console.log("Connected to contract 'USDTS' successfully.");
		} catch (error) {
			console.error("Fail to connect to contract 'USDTS'.");
			console.error(error);
		}
	},

	// deposit: async function(receiver, sponsor, value, callback) {
	// 	const { transfer } = this.meta.methods;
	// 	transfer(receiver, value).send({from:sponsor}, callback);
	// },

	approve: async function(value, callback) {
		const tx = {
			to: this.contractAddr,
			gas: 100000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.approve(this.exchangeContractAddr, value).encodeABI()
		};

		if (localStorage.getItem('privateKey') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            web3Util.signTransaction(this.web3, tx, callback, localStorage.getItem('privateKey'));
        }
	},

	refreshAllowance: async function(callback) {
		let sponsor = localStorage.getItem('address');
		if (sponsor == null || sponsor == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { allowance } = this.meta.methods;
		allowance(sponsor, this.exchangeContractAddr).call(callback);
	},

	refreshBalance: async function(callback) {
		let owner = localStorage.getItem('address');
		if (owner == null || owner == "") {
			this.$Message.error("You should first set your account in wallet manager");
			return;
		}

		const { balanceOf } = this.meta.methods;
		balanceOf(owner).call(callback);
	},
}

export { USDTS }




