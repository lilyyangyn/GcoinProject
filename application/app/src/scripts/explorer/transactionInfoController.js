import { Transaction } from "../basics/transaction.js";
import { BlockInfoCtrl } from "./blockInfoCtrl.js";

const TransactionInfoCtrl = {
	web3 : null,
	cache : new Map(),

	getTransaction: async function(thash, success, failure) {
		const { web3 } = this;

		var transaction = this.cache.get(thash);
		if (!transaction) {
			web3.eth.getTransaction(thash, function(error, result) {
				if (!error) {
					transaction = new Transaction(result);
					cache.set(thash, transaction);
					success(transaction);
				} else {
					console.error(error);
					failure(error);
				}
			});
		}
	}

	getDetailedTransaction: async function(thash, success, failure) {
		const { web3 } = this;

		var transaction;
		var isSuccess = true;
		this.getTransaction(thash, function(tx) {
			transaction = tx;
		}, function(error) {
			isSuccess = false;
			failure(error);
		})

		if (!isSuccess) {
			return;
		}

		web3.eth.getTransactionReceipt(thash, function(error, result) {
			if (!error) {
				transaction.setReceipt(result);
			} else {
				console.error(error);
				isSuccess = false;
				failure(error);
			}
		});

		BlockInfoCtrl.getBlock(transaction.blockNumber, function(block) {
			transaction.block = block;
		}, function(error) {
			isSuccess = false;
			failure(error);
		})

		if (isSuccess) {
			success(transaction);
		}

	}

}

export { TransactionInfoCtrl }