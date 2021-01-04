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
	import { vm } from "../main.js";
	import { BlockInfoCtrl } from '../scripts/blockInfoController.js';
	export default {
		name: 'BlockInfoCtrl',
		created(){
			this.blockInfoController = BlockInfoCtrl;
		},
		mounted(){
			BlockInfoCtrl.web3 = vm.web3;
			BlockInfoCtrl.start();
		}
	}
</script>