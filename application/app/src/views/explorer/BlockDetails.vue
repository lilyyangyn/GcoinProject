<template>
	<div class="block">
		<h1>This is the block page</h1>

		<div class="getBlock">
			<input type="text" placeholder="bid" id="bid">

			<button class="button" @click="gcoin.transfer()">submit</button>
			
		</div>
		<br>

<!-- 
		<div class="table blocks">
			<div class="table-header">
				<div class="table-row">
					<div class="table-column">Block</div>
					<div class="table-column">Age</div>
					<div class="table-column">Txn</div>
					<div class="table-column">Uncles</div>
					<div class="table-column">Miner</div>
					<div class="table-column">Gas Used</div>
					<div class="table-column">Gas Limit</div>
					<div class="table-column">Avg.Gas Price</div>
					<div class="table-column">Reward</div>
					
				</div>
			</div>
			<div class="table-body">
				<div class="table-row">
			
				</div>
			</div>
 -->
			<div>
			</div>
		


	</div>
</template>

<script>
	import { BlockInfoCtrl } from '../../scripts/explorer/blockInfoController.js';
	export default {
		name: 'BlockInfoCtrl',
		data() {
			return{
				block: null,
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
				console.log(block);
			},


			failureCallback(errors) {
				//TODO
				console.log(errors);
			}

		},

		created(){
			this.blockInfoController = BlockInfoCtrl;
		},

		mounted: function(){
			this.blockInfoController.getBlock(this.$route.params.id, this.displayBlockDetails, this.failureCallback);
		}
	}
</script>