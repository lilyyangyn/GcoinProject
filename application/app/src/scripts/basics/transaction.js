var web3 = require('web3');

export class Transaction {

	constructor(queryResult) {
		this.hash = queryResult.hash;
		this.blockNumber = queryResult.blockNumber;
		this.from = queryResult.from;
		this.to = queryResult.to;
		this.value = queryResult.value;
		this.gasPrice = queryResult.gasPrice;
		this.gasUsed = queryResult.gas;
		this.input = queryResult.input;
	}

	get transactionFee() {
		if (!this._transactionFee) {
			this._transactionFee = this.gasPrice * this.gasUsed;
		}
		return this._transactionFee;
	}

	get timestamp() {
		if (this.block) {
			return this.block.timestamp;
		}
		return undefined;
	}

	setReceipt(result) {
		this.hasReceipt = true;
		this.status = result.status;
		this.contractAddress = result.contractAddress;
	}
}