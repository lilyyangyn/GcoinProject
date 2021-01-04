import { Block } from "../basics/block.js";

const BlockInfoCtrl = {
	web3 : null,
	cache : new Map(),

	getBlock: async function(bid, success, failure) {
		const { web3 } = this;


		var block = this.cache.get(bid);
		if (!block) {
			web3.eth.getBlock(bid, function(error, result) {
				if (!error) {
					block = new Block(result);
					this.cache.set(block.height, block);
					this.cache.set(block.hash, block);
					success(block);
				} else {
					console.error(error);
					failure(error);
				}
			});
		} else {
			success(block);
		}
		
	},


	getLastNBlocks: async function(n, success, failure) {
		const { web3 } = this;

		var blocks = [];
		var errors = [];
		const storeLocalCopy = function(error, result) {
			if (!error) {
				var block = new Block(result);
				this.cache.set(block.height, block);
				this.cache.set(block.hash, block);
				blocks.push(new Block(result));
			} else {
				console.error(error);
				errors.push(error);
			}
		}

		const latest = await web3.eth.getBlockNumber();
		const batch = new web3.eth.BatchRequest();
		for (var i = 0; i < n; i++) {
			if (latest < i) {
				break;
			}
			var block = this.cache.get(latest - i);
			if (!block) {
				batch.add(
					web3.eth.getBlock.request(latest - i, storeLocalCopy)
				)
			} else {
				blocks.push(block);
			}
			
		}
		batch.execute();

		if (blocks.length) {
			success(blocks);
		} else {
			failure(errors);
		}
	}
}

export { BlockInfoCtrl }