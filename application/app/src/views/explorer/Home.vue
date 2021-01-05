<template>
	<div class="blockHome">
		<h1>This is the explorer page</h1>

		<div class="getBlock">
			<input type="text" placeholder="bid" id="bid">

			<button class="button" @click="blockInfoController.getBlocks(n, displayBlockWithIdx, failureCallback)">submit</button>
			
		</div>
		<br>
		<div class="getLatestNBlocks">
			<input type="text" placeholder="n" id="n" v-model = "n">

			<button class="button" @click="blockInfoController.getLastestNBlocks(n, displayBlockWithIdx, failureCallback)">submit</button>
			
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
		name: 'ExplorerHome',
		data(){
			return {
				n: 10,
			}
		},
		methods: {
			getLatestBlocks() {
				this.blockInfoController.getLastestNBlocks(10, this.displayBlockWithIdx, this.failureCallback);
			},

			displayBlockWithIdx(block, idx) {
				//TODO
				console.log(idx);
			},

			failureCallback(error) {
				//TODO
				console.log(error);
			},

		},

		created(){
			this.blockInfoController = BlockInfoCtrl;
		},
		mounted(){
			this.blockInfoController.web3 = vm.web3;

			window.addEventListener('load', () => {
				this.getLatestBlocks();
			});
		},

		
	}
</script>