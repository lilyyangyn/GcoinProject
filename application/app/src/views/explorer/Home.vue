<template>
	<div class="transfer">
		<h1>This is the explorer page</h1>

		<div class="getBlock">
			<input type="text" placeholder="bid" id="bid">

			<button class="button" @click="gcoin.transfer()">submit</button>
			
		</div>
		<br>

		<div class="delegate">
			<input type="text" placeholder="delegate from" id="delegate-from">
			<input type="text" placeholder="delegate to" id="delegate-to">
			<input type="text" placeholder="delegate value" id="delegate-value">

			<button class="button" @click="gcoin.transferFrom()">submit</button>
		</div>


	</div>
</template>

<script>
	import { vm } from "../../main.js";
	import { BlockInfoCtrl } from '../../scripts/explorer/blockInfoController.js';
	export default {
		name: 'ExplorerHome',
		methods: {
			getLatestBlocks() {
				this.blockInfoController.getLastestNBlocks(10, this.displayLatestBlocks, this.failureCallback);
			},

			displayLatestBlocks(blocks) {
				//TODO
				console.log(blocks);
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

			window.addEventListener('load', () => {
				this.getLatestBlocks();
			});
		},

		
	}
</script>