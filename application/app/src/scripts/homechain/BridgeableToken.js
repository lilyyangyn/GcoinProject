import {contractAbi} from "@/scripts/web3Util/contractAbi";
import {utilConfig} from "@/scripts/web3Util/config";
import {web3Util} from "@/scripts/web3Util/web3Util"

const BridgeableToken_Home = {
	web3: null,

	contractAddr: utilConfig.homeChainContractAddress.Bridgeable_Token,
	bridgeMediator: utilConfig.homeChainContractAddress.Bridge_ERC677_Extension_Mediator,
	exchangeContractAddr: utilConfig.homeChainContractAddress.USDT_Exchcoin_Exchange,

	start: async function() {	
		if (this.web3 != null && this.meta != null) {
			return;
		}	

		if (web3Util.parentChainWeb3 == null) {
          await web3Util.homeChainWeb3Initialize();
      	}
		this.web3 = web3Util.parentChainWeb3;

		try {
			this.meta = new this.web3.eth.Contract(
				contractAbi.bridgeTokenAbi,
				this.contractAddr
				);
			
			console.log("Connected to contract 'BridgeableToken_Home' successfully.");
		} catch (error) {
			console.error("Could not connect to contract 'BridgeableToken_Home'.");
		}
	},

	transferToChildChain: async function(value, resolvedCallback, confirmCallback, errorCallback) {
		await this.start();

		const tx = {
			to: this.contractAddr,
			gas: 1000000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.transferAndCall(this.bridgeMediator, value, '0x').encodeABI()
		};
		
		web3Util.signTransactionWithLocalKey(this.web3, tx, null, comfirmCallback, errorCallback);
	},

	approve: async function(value, confirmCallback, errorCallback) {
		await this.start();

		const tx = {
			to: this.contractAddr,
			gas: 100000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.approve(this.exchangeContractAddr, value).encodeABI()
		};

		web3Util.signTransactionWithLocalKey(this.web3, tx, null, comfirmCallback, errorCallback);
	}

}

export { BridgeableToken_Home }




