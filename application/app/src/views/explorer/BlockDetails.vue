<template>
	<div class="block">
		<h1>This is the block page: {{block.height}}</h1>
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
					<div class="table-column">Height:</div>
					<div class="table-column">{{block.height}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Timestamp:</div>
					<div class="table-column"><{{block.timestamp}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Transactions:</div>
					<div class="table-column">{{block.transactions.length}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Miner:</div>
					<div class="table-column">{{block.miner}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Difficulty:</div>
					<div class="table-column">{{block.difficulty}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Total Difficulty:</div>
					<div class="table-column">{{block.totalDifficulty}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Size:</div>
					<div class="table-column">{{block.size}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Gas Used:</div>
					<div class="table-column">{{block.gasUsed}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Gas Limit:</div>
					<div class="table-column">{{block.gasLimit}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Extra Data:</div>
					<div class="table-column">{{block.extraData}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Hash:</div>
					<div class="table-column">{{block.hash}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Parent Hash:</div>
					<div class="table-column">{{block.parentHash}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Sha3 Uncles:</div>
					<div class="table-column">{{block.sha3Uncles}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">State Root:</div>
					<div class="table-column">{{block.stateRoot}}</div>
				</div>
				<div class="table-row">
					<div class="table-column">Nonce:</div>
					<div class="table-column">{{block.nonce}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.block-row {

}
.detail-item {
	font-weight: 700!important;
	display: inline-block;
}

</style>

<script>
	import ExplorerCtrl from '@/components/Explorer.vue';
	export default {
		name: 'BlockInfoCtrl',
		data() {
			return{
				block: null,
				error: false,
				errorInfo: "",
				uncles: true,
			}
		},
		methods: {

			getBlock() {
				const bid = document.getElementById("bid").value;

				this.blockInfoController.getBlock(bid, this.displayBlockDetails, this.failureCallback);
			},

			/* UI Callback  */

			displayBlockDetails(block){
				this.block=block;
			},


			failureCallback(error) {
				this.error=true;
				this.errorInfo=error;
				console.log(error);
			},

			getTransaction(thash) {
				this.$router.push({
					name: 'Explorer.TxDetails',
					params: {
						id: thash,
					}
				});
			},

		},

		created(){
			this.blockInfoController = ExplorerCtrl.blockInfoController;
			
		},

		mounted: function(){
			this.blockInfoController.getBlock(this.$route.params.id, this.displayBlockDetails, this.failureCallback);
			
		}
	}
</script>