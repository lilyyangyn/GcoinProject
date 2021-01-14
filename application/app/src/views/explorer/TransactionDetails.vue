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
		<div v-else class="table blocks">
			<div class="table-body">
				<div class="table-row">
					<div class="table-column">Hash:</div>
					<div class="table-column">{{ transaction.hash }}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Block:</div>
					<div class="table-column"><a @click="getInfo(transaction.blockNumber)">{{transaction.blockNumber}}</a></div>
				</div>
				<div class="table-row">
					<div class="table-column">From:</div>
					<div class="table-column">{{transaction.from}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">To:</div>
					<div class="table-column">{{transaction.to}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Value:</div>
					<div class="table-column">{{transaction.value}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Gas Price:</div>
					<div class="table-column">{{transaction.gasPrice}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Gas Used:</div>
					<div class="table-column">{{transaction.gasUsed}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Input:</div>
					<div class="table-column">{{transaction.input}}</div>
				</div>
				<div class="table-row">
					<button @click="getDetailed()">show more</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ExplorerCtrl from '@/components/Explorer.vue';
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
			},


			failureCallback(error) {
				
				this.error=true;
				this.errorInfo=error;
				console.log(error);
			},

			getInfo(height) {
				this.$router.push({
					name: 'Explorer.BlockDetails',
					params: {
						id: height,
					}
				});
			},

		},

		created(){
			this.transactionInfoController = ExplorerCtrl.transactionInfoController;
			
		},
		
		mounted: function(){
			this.transactionInfoController.getTransaction(this.$route.params.id, this.displayTransactionDetails, this.failureCallback);
		}

	}
</script>