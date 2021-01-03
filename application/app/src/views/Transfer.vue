<template>
	<div class="transfer">
		<h1>This is the transfer page</h1>

	<p>Version: {{ gcoin.version }}</p>
		<div class="transfer">
			<input type="text" placeholder="transfer to" id="transfer-to">
			<input type="text" placeholder="transfer-value" id="transfer-value">

			<button class="button" @click="gcoin.transfer()">submit</button>
			
		</div>
		<br>

		<div class="delegate">
			<input type="text" placeholder="delegate-from" id="delegate-from">
			<input type="text" placeholder="delegate-to" id="delegate-to">
			<input type="text" placeholder="delegate-value" id="delegate-value">

			<button class="button" @click="gcoin.transferFrom()">submit</button>
		</div>
		<br>

		<div class="approve">
			<input type="text" placeholder="approve-spender" id="approve-spender">
			<input type="text" placeholder="approve-value" id="approve-value">

			<button class="button" @click="gcoin.approve()">submit</button>

		</div>
		<br>

		<div class="allownce">
			<input type="text" placeholder="allowance-spender" id="allowance-spender">
			<input type="text" placeholder="allowance-owner" id="allowance-owner">

			<button class="button" @click="gcoin.allowance()">submit</button>
		</div>

		<div class="balance">
			<p id="balance">balance</p>
		</div>

		<div class="status">
			<p id="status">status</p>
		</div>


	</div>
</template>

<script>
	import { vm } from "../main.js";
	import { Gcoin } from '../scripts/gcoin.js';
	export default {
		created(){
			this.gcoin = Gcoin;
		},
		mounted(){
			Gcoin.web3 = vm.web3;
			Gcoin.start();
		}
	}
</script>