import { Block } from "../basics/block.js";

const BlockInfoCtrl = {
	web3 : null,

	getBlock: async function(bid) {
		const {web3} = this;

		var block = null;
		web3.eth.getBlock(bid).then((result) => {
			block = new Block(result);
		}).catch((error) => {
			console.error(error);
		})
		return block;
	}

	getLastNBlocks: async function(n) {
		const {web3} = this;

		var blocks = [];
		const storeLocalCopy = function(error, result) {
			if (!error) {
				blocks.push(new Block(result));
			} else {
				console.error(error);
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

		return blocks;
	}
}

export { BlockInfoCtrl }