import {contractAbi} from "@/scripts/web3Util/contractAbi";
import {utilConfig} from "@/scripts/web3Util/config";
import {web3Util} from "@/scripts/web3Util/web3Util"

const BridgeableToken = {
	web3: null,
	meta: null,
	contractAddr: config.homeChainContractAddress.Bridgeable_Token,
	bridgeMediator: config.homeChainContractAddress.Bridge_ERC677_Extend_Mediator,

	start: async function(web3) {	
		if (this.web3 != null && this.meta != null) {
			return;
		}	

		this.web3 = web3;

		try {
			this.meta = new web3.eth.Contract(
				contractAbi.bridgeTokenAbi,
				this.contractAddr
				);
			
			console.log("Connected to contract 'BridgeableToken' successfully.");
		} catch (error) {
			console.error("Could not connect to contract 'BridgeableToken'.");
		}
	},

	transferToChildChain: async function(value, callback) {
		const tx = {
			to: this.contractAddr,
			gas: 100000,
			gasPrice: 10000000000,
			value: 0,
			data: this.meta.methods.transferAndCall(this.bridgeMediator, value, '0x').encodeABI()
		};
		
		if (localStorage.getItem('privateKey') == "" || localStorage.getItem('privateKey') == null){
            this.$Message.error("You should first set your key in wallet manager");
        }else{
            web3Util.signTransaction(this.web3, tx, callback, localStorage.getItem('privateKey'));
        }
	},

}

export { BridgeableToken }




