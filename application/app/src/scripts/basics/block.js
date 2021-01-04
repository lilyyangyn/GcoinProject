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
		this.extraData = web3.utils.hexToUtf8(queryResult.extraData);
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


}