import { Block } from "../basics/block.js";
import {web3Util} from "@/scripts/web3Util/web3Util"

const BlockInfoCtrl = {
	web3 : null,
	cache : null,

	start: async function() {
		if (this.web3 != null && this.cache != null) {
			return;
		}	

		if (web3Util.childChainWeb3 == null) {
          	await web3Util.childChainWeb3Initialize();
      	}
		this.web3 = web3Util.childChainWeb3;

		this.cache = new Map()
	},

	getBlock: async function(bid, success, failure) {
		await this.start();

		const { web3 } = this;
		var self = this;

		var block = this.cache.get(bid);
		if (!block) {
			console.log("Create request, block id: " + bid);
			web3.eth.getBlock(bid, function(error, result) {
				if (!error) {
					if (!result) {
						failure("No block found.");
						return;
					}
					block = new Block(result);
					self.cache.set(block.height, block);
					self.cache.set(block.hash, block);
					success(block);
				} else {
					console.error(error);
					failure(error);
				}
			});
		} else {
			console.log("Use cache, block id: " + bid);
			success(block);
		}
		
	},


	getLastestNBlocks: async function(n, success, failure) {
		await this.start();
		
		const { web3 } = this;
		var self = this;

		const latest = await web3.eth.getBlockNumber();
		const storeLocalCopy = function(error, result) {
			if (!error) {
				var block = new Block(result);
				self.cache.set(block.height, block);
				self.cache.set(block.hash, block);
				success(block, latest - block.height);
			} else {
				failure(error);
			}
		}

		const batch = new web3.eth.BatchRequest();
		for (var i = 0; i < n; i++) {
			if (latest < i) {
				break;
			}
			var block = this.cache.get(latest - i);
			if (!block) {
				console.log("Create request, block id: " + (latest - i));
				batch.add(
					web3.eth.getBlock.request(latest - i, storeLocalCopy)
				);
			} else {
				console.log("Use cache, block id: " + (latest - i));
				success(block, latest - block.height);
			}
		}
		batch.execute();

	}
}

export { BlockInfoCtrl }