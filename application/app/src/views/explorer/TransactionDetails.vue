<template>
	<div class="transaction">
		<h1>This is the transaction page</h1>
		<br>

		<div v-if="error">
			<Alert type="error" show-icon>
				An error prompt
				<span slot="desc">
					{{errorInfo}}
				</span>
			</Alert>
		</div>
		<div v-else>
			<div class="detail-raw">
				<div class="detail-item">hash: </div>
				{{transaction.hash}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">blockNumber: </div>
				{{transaction.blockNumber}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">from: </div>
				{{transaction.from}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">to: </div>
				{{transaction.to}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">value: </div>
				{{transaction.value}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">gasPrice: </div>
				{{transaction.gasPrice}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">gasUsed: </div>
				{{transaction.gasUsed}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">input: </div>
				{{transaction.input}}
			</div>
			<br>
			<div>
				<button @click="getDetailed()">show more</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { TransactionInfoCtrl } from '../../scripts/explorer/transactionInfoController.js';
	export default {
		name: 'TransactionInfoCtrl',
		data() {
			return{
				transaction: null,
				error: false,
				errorInfo: "",
			}
		},
		methods: {
			

			/* UI Callback  */

			displayTransactionDetails(transaction){
				this.transaction=transaction;
				console.log(transaction);
			},


			failureCallback(error) {
				
				this.error=true;
				this.errorInfo=error;
				console.log(error);
			}

		},

		created(){
			this.transactionInfoController = TransactionInfoCtrl;
			
		},
		mounted: function(){
			this.transactionInfoController.getTransaction(this.$route.params.id, this.displayTransactionDetails, this.failureCallback);
		}

	}
</script>