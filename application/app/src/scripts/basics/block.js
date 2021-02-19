var web3 = require('web3');

export class Block {

	constructor(queryResult) {
		this.height = queryResult.number;
		this.miner = queryResult.miner;
		this.difficulty = queryResult.difficulty;
		this.totalDifficulty = queryResult.totalDifficulty;
		this.size = queryResult.size;
		this.gasUsed = web3.utils.hexToNumber(queryResult.gasUsed);
		this.gasLimit = web3.utils.hexToNumber(queryResult.gasLimit);
		this.extraData = queryResult.extraData;
		this.hash = queryResult.hash;
		this.parentHash = queryResult.parentHash;
		this.sha3Uncles = queryResult.sha3Uncles;
		this.stateRoot = queryResult.stateRoot;
		this.nonce = queryResult.nonce;

		this.timestamp = this.formatTimeStamp(queryResult.timestamp);

		this.transactions = queryResult.transactions;
	}

	formatTimeStamp(rawTimeStamp) {
		var date = new Date(rawTimeStamp);
		return date.toUTCString();
	}

	decodeExtraData() {
		// return web3.utils.hexToAscii("0x" + this.extraData.substring(10));
		// return web3.utils.hexToUtf8("0x7070796520e4b883e5bda9e7a59ee4bb99e9b1bc");
		try {
			var decodeData = web3.utils.hexToUtf8(this.extraData);
		} catch {
			var decodeData = web3.utils.hexToAscii(this.extraData);
		}
		return decodeData;
	}


}