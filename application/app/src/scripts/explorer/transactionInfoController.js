import { Transaction } from "../basics/transaction.js";
import { BlockInfoCtrl } from "./blockInfoCtrl.js";
import { vm } from "../../main.js";

const TransactionInfoCtrl = {
	web3 : vm.web3,
	cache : new Map(),

	getTransaction: async function(thash, success, failure) {
		const { web3 } = this;
		var self = this;

		var transaction = this.cache.get(thash);
		if (!transaction) {
			console.log("Create request, tx hash: " + thash);
			web3.eth.getTransaction(thash, function(error, result) {
				if (!error) {
					if (!result) {
						failure("No transaction found.");
						return;
					}
					transaction = new Transaction(result);
					self.cache.set(thash, transaction);
					success(transaction);
				} else {
					console.error(error);
					failure(error);
				}
			});
		} else {
			console.log("Use cache, tx hash: " + thash);
			success(transaction);
		}
	}

	getDetailedTransaction: async function(transaction, success, failure) {
		if (!transaction) {
			return;
		}

		const { web3 } = this;

		var thash = transaction.hash;

		if (!transaction.hasReceipt) {
			console.log("Create request for tx receipt, tx hash: " + thash);

			web3.eth.getTransactionReceipt(thash, function(error, result) {
				if (!error) {
					transaction.setReceipt(result);
				} else {
					console.error(error);
					isSuccess = false;
					failure(error);
				}
			});
		}
		
		if (!transaction.block) {
			console.log("Create request for tx block, tx hash: " + thash);

			BlockInfoCtrl.getBlock(transaction.blockNumber, function(block) {
			transaction.block = block;
			}, function(error) {
				isSuccess = false;
				failure(error);
			})
		}
		
		if (isSuccess) {
			success(transaction);
		}

	}

}

export { TransactionInfoCtrl }