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
					<div class="table-column">Miner</div>
					<div class="table-column">Gas Used</div>
					<div class="table-column">Gas Limit</div>
					
				</div>
			</div>
			<div class="table-body">
				<div class="table-row" v-for="block in blocks" :key="block.height">
					<div class="table-column" v-text="block.height"></div>
					<div class="table-column" v-text="block.timestamp"></div>
					<div class="table-column" v-text="block.transactions"></div>
					<div class="table-column" v-text="block.miner"></div>
					<div class="table-column" v-text="block.gasUsed"></div>
					<div class="table-column" v-text="block.gasLimit"></div>
				
				</div>
			</div>
			
		</div>


	</div>
</template>

<script>
	import { BlockInfoCtrl } from '../../scripts/explorer/blockInfoController.js';
	export default {
		name: 'ExplorerHome',
		data(){
			return {
				n: 10,
				blocks: []
			}
		},
		methods: {

			getLatestBlocks() {
				this.blockInfoController.getLastestNBlocks(10, this.displayBlockWithIdx, this.failureCallback);
			},

			/* UI Callback  */

			displayBlockWithIdx(block, idx) {
				this.blocks.push(block);
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
			window.addEventListener('load', () => {
				this.getLatestBlocks();
			});
		},

		
	}
</script>