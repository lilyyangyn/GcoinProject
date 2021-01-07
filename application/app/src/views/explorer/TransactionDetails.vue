<template>
	<div class="transaction">
		<h1>This is the transaction page</h1>

	</div>
</template>

<script>
	import { TransactionInfoCtrl } from '../../scripts/explorer/transactionInfoController.js';
	export default {
		name: 'TransactionInfoCtrl',
		data() {
			return{
				transaction: null,
			}
		},
		methods: {

			/* UI Callback  */

			displayTransactionDetails(transaction){
				this.transaction=transaction;
				console.log(transaction);
			},


			failureCallback(error) {
				//TODO
				console.log(error);
			}

		},

		created(){
			this.transactionInfoController = TransactionInfoCtrl;
		},

		mounted: function(){
			this.transactionInfoController.getTransaction(this.$route.params.thash, this.displayTransactionDetails, this.failureCallback);
		}
	}
</script>