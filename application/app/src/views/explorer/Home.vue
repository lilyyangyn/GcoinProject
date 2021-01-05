<template>
	<div class="blockHome">
		<h1>This is the explorer page</h1>

		<div class="getBlock">
			<input type="text" placeholder="bid" id="bid" v-model="bid">

			<button class="button" @click="getOneBlock(bid)">submit</button>
			
		</div>
		<br>
		<div class="getLatestNBlocks">
			<input type="text" placeholder="n" id="n" v-model = "n">

			<button class="button" @click="getNBlocks(n)">submit</button>
			
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
			<div v-if="error">
			<Alert type="error" show-icon>
				An error prompt
				<span slot="desc">
					{{errorInfo}}
				</span>
			</Alert>
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
				bid: "",
				blocks: [],
				error: false,
				errorInfo: "",
			}
		},
		methods: {
			getNBlocks(n) {
				this.blocks =[];
				this.blockInfoController.getLastestNBlocks(n, this.displayBlockWithIdx, this.failureCallback);

			},

			getOneBlock (bid) {
				this.blocks =[];
				this.blockInfoController.getBlock(bid, this.displayBlockWithIdx, this.failureCallback);
			},

			getLatestBlocks() {
				this.blockInfoController.getLastestNBlocks(10, this.displayBlockWithIdx, this.failureCallback);
			},

			/* UI Callback  */

			displayBlockWithIdx(block, idx) {
				this.error=false;
				this.blocks.push(block);
				console.log(idx);
			},

			failureCallback(error) {
				this.error = true;
				this.errorInfo = error;
				console.log(error);
			},

		},

		created(){
			this.blockInfoController = BlockInfoCtrl;
		},

		mounted: function(){
			this.getLatestBlocks();
		},

		
	}
</script>