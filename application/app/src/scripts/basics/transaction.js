var web3 = require('web3');

export class Transaction {

	constructor(queryResult) {
		this.hash = queryResult.hash;
		this.blockNumber = queryResult.blockNumer;
		this.from = queryResult.from;
		this.to = qeuryResult.to;
		this.value = qeuryResult.value;
		this.gasPrice = qeuryResult.gasPrice;
		this.gasUsed = qeuryResult.gas;
		this.input = web3.utils.hexToAscii(queryResult.input);
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