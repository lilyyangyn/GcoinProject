var web3 = require('web3');

export class Block {
	var height;
	var timestamp;
	var miner;
	// var blockRewards;
	// var uncleRewards;
	var difficulty;
	var totalDifficulty;
	var size;
	var gasUsed;
	var gasLimit;
	var extraData;

	var hash;
	var parentHash;
	var sha3Uncles;
	var stateRoot;
	var nonce;

	var transactions;

	constructor(queryResult) {
		height = queryResult.number;
		miner = queryResult.miner;
		difficulty = queryResult.difficulty;
		totalDifficulty = queryResult.totalDifficulty;
		size = queryResult.size;
		gasUsed = web3.utils.hexToNumber(queryResult.gasUsed);
		gasLimit = web3.utils.hexToNumber(queryResult.gasLimit);
		extraData = web3.utils.hexToUtf8(queryResult.extraData);
		hash = queryResult.hash;
		parentHash = queryResult.parentHash;
		sha3Uncles = queryResult.sha3Uncles;
		stateRoot = queryResult.stateRoot;
		nonce = queryResult.nonce;

		timestamp = this.formatTimeStamp(queryResult.timestamp);

		transactions = queryResult.transactions;
	}

	formatTimeStamp(rawTimeStamp) {
		var date = new Date(rawTimeStamp);
		return date.toUTCString();
	}


}