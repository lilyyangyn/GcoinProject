import { Block } from "../basics/block.js";
import { vm } from "../../main.js";

const BlockInfoCtrl = {
	web3 : vm.web3,
	cache : new Map(),

	getBlock: async function(bid, success, failure) {
		const { web3 } = this;
		var self = this;


		var block = this.cache.get(bid);
		if (!block) {
			console.log("Create request, block id: " + bid);
			web3.eth.getBlock(bid, function(error, result) {
				if (!error) {
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