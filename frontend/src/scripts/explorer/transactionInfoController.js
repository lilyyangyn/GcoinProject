import { Transaction } from "../basics/transaction.js";
import { BlockInfoCtrl } from "./blockInfoController.js";
import {web3Util} from "@/scripts/web3Util/web3Util"

const TransactionInfoCtrl = {
	web3 : null,
	cache : null,

	start: async function() {
		if (this.web3 != null && this.cache != null) {
			return;
		}	

		if (web3Util.childChainWeb3 == null) {
          	await web3Util.childChainWeb3Initialize();
      	}
		this.web3 = web3Util.childChainWeb3;

		this.cache = new Map()
	},

	getTransaction: async function(thash, success, failure) {
		await this.start();

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
	},

	getDetailedTransaction: async function(transaction, success, failure) {
		if (!transaction) {
			return;
		}

		const { web3 } = this;

		var thash = transaction.hash;

		if (!transaction.hasReceipt) {
			console.log("Create request for tx receipt, tx hash: " + thash);
			var isSuccess = true;
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