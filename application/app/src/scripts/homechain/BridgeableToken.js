import {contractAbi} from "@/scripts/web3Util/contractAbi";
import {utilConfig} from "@/scripts/web3Util/config";
import {web3Util} from "@/scripts/web3Util/web3Util"

const BridgeableToken = {
	web3: null,
	meta: null,
	contractAddr: utilConfig.homeChainContractAddress.Bridgeable_Token,
	bridgeMediator: utilConfig.homeChainContractAddress.Bridge_Mediator,

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
			
			console.log("Connected to contract 'BridgeableToken' successfully.");
		} catch (error) {
			console.error("Could not connect to contract 'BridgeableToken'.");
		}
	},

	transferToChildChain: async function(value, confirmCallback, errorCallback) {
		await this.start();

		const tx = {
			to: this.contractAddr,
			gas: 1000000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.transferAndCall(this.bridgeMediator, value, '0x').encodeABI()
		};
		
		if (localStorage.getItem('privateKey') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            await web3Util.signTransaction(this.web3, tx, localStorage.getItem('privateKey'), null, confirmCallback, errorCallback);
        }
	},

}

export { BridgeableToken }




