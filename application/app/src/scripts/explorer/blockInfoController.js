import { Block } from "../basics/block.js";

const BlockInfoCtrl = {
	web3 : null,

	getBlock: async function(bid, success, failure) {
		const {web3} = this;

		var block = null;
		web3.eth.getBlock(bid, function(error, result) {
			if (!error) {
				block = new Block(result);
				success(block);
			} else {
				console.error(error);
				failure(error);
			}
		});
	}

	getLastNBlocks: async function(n, success, failure) {
		const { web3 } = this;

		var blocks = [];
		var errors = [];
		const storeLocalCopy = function(error, result) {
			if (!error) {
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
			batch.add(
				web3.eth.getBlock.request(latest - i, storeLocalCopy)
			)
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