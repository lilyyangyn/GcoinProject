<template>
	<div class="transfer">
		<h1>This is the transfer page</h1>

	<p>Version: {{ gcoin.version }}</p>
		<div class="transfer">
			<input type="text" placeholder="transfer to" id="transfer-to">

			<input type="text" placeholder="transfer value" id="transfer-value">

			<button class="button" @click="initiateTx(gcoin.transfer(callbackUpdateStatus))">submit</button>
			
		</div>
		<br>

		<div class="delegate">
			<input type="text" placeholder="delegate from" id="delegate-from">
			<input type="text" placeholder="delegate to" id="delegate-to">
			<input type="text" placeholder="delegate value" id="delegate-value">

			<button class="button" @click="initiateTx(gcoin.transferFrom(callbackUpdateStatus))">submit</button>
		</div>
		<br>

		<div class="approve">
			<input type="text" placeholder="approve spender" id="approve-spender">
			<input type="text" placeholder="approve value" id="approve-value">

			<button class="button" @click="initiateTx(gcoin.approve(callbackShowResult))">submit</button>

		</div>
		<br>

		<div class="allownce">
			<input type="text" placeholder="allowance spender" id="allowance-spender">
			<input type="text" placeholder="allowance owner" id="allowance-owner">

			<button class="button" @click="gcoin.refreshAllowance(callbackRefreshAllowence)">submit</button>
		</div>

		<div class="balance">
			<p id="balance">balance</p>
		</div>

		<div class="status">
			<p id="status" style="visibility:hidden">status</p>
		</div>


	</div>
</template>

<script>
	//import { vm } from "../main.js";
	import { Gcoin } from '../scripts/gcoin.js';
	export default {

		methods: {

			initiateTx(transaction) {
				this.setStatus("Initiate Transaction. Please wait...");
				transaction;
			},

			/* UI Methods */

			setStatus(message) {
				const status = document.getElementById("status");
				if (status) {
					status.innerHTML = message;
					if (status.style['visibility'] != 'visible') {
						status.style.visibility = 'visible';
					}
				}
			},

			popMsg(message, error) {
				// TODO
				const popTitle = document.getElementById("popTitle");
				if (popTitle) {
					popTitle.innerHTML = message;
				}
				
				const popDetail = document.getElementById("popDetail");
				if (popDetail) {
					popDetail.innerHTML = error;
				}
			},

			updateBalance(result) {
				const balanceElement = document.getElementById("balance");
				balanceElement.innerHTML = result;
			},

			/* UI Callback  */

			callbackUpdateStatus(error) {
				if (!error) {
					this.setStatus("Transaction complete!");
					this.updateBalance(Gcoin.balance);
				} else {
					this.setStatus(error.message.substring(66));
					Gcoin.refreshBalance(this.callbackRefreshBalance);
				}
			},

			callbackShowResult(error) {
				if (!error) {
					this.setStatus("Approved!");
				} else {
					this.setStatus(error.message.substring(66));
				}
			},

			callbackRefreshBalance(error, result) {
				if (!error) {
					this.updateBalance(result);
				} else {
					this.popMsg("Fail to get balance.", error);
				}
				
			},

			callbackRefreshAllowence(error, result) {
				if (!error) {
					const balanceElement = document.getElementById("allowed");
					balanceElement.innerHTML = result;
				} else {
					this.popMsg("Fail to get balance.", error);
				}
				
			}

		},

		created(){
			this.gcoin = Gcoin;

			var self = this;
			Gcoin.start(() => {
				Gcoin.refreshBalance(this.callbackRefreshBalance);
			});
			
		},

		mounted(){
			// window.addEventListener('load', () => {
			// 	this.gcoin.refreshBalance(this.callbackRefreshBalance);
			// });
		},
	}
</script>