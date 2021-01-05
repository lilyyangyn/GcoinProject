<template>
	<div class="transfer">
		<h1>This is the explorer page</h1>

		<div class="getBlock">
			<input type="text" placeholder="bid" id="bid">

			<button class="button" @click="gcoin.transfer()">submit</button>
			
		</div>
		<br>

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
			
		</div>


	</div>
</template>

<script>
	import { vm } from "../../main.js";
	import { BlockInfoCtrl } from '../../scripts/explorer/blockInfoController.js';
	export default {
		name: 'BlockInfoCtrl',
		methods: {

			getBlock() {
				const bid = document.getElementById("bid").value;

				this.blockInfoController.getBlock(bid, this.displayBlockDetails, this.failureCallback);
			},

			/* UI Callback  */

			displayBlockDetails(block) {
				//TODO
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
		
		mounted(){
			this.blockInfoController.web3 = vm.web3;
		}
	}
</script>