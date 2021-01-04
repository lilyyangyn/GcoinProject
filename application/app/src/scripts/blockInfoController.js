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
	},

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
		const blockNumbers = _range(latest - n, latest + 1, 1);
		const batch = new web3.eth.BatchRequest();

		blockNumbers.forEach((blockNumber) => {
			batch.add(
				web3.eth.getBlock.request(blockNumber, storeLocalCopy)
			)
		});

		batch.execute();

		return blocks;
	}
}

export { BlockInfoCtrl }