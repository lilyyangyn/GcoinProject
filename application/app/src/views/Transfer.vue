<template>
	<Card class="contract-info-container">
		<Collapse style="width: 100%">
	<!-- <div class="transfer"> -->
		
		<Panel name="contractInfo">Contract Info</Panel>
		<Panel name="contractSourceCode">Contract Source Code</Panel>
	
		<Panel name="transfer">Transfer
			<div slot="content">
				<label>transfer to</label>
			<input type="text" id="transfer-to">
				<label>transfer value</label>
			<input type="text" id="transfer-value">

			<button class="button" @click="initiateTx(gcoin.transfer(callbackUpdateStatus))">submit</button>
			
			</div>
		</Panel>

		<Panel name="delegate">Delegate
		<div slot="content">
			<label>delegate from</label>
			<input type="text" placeholder="" id="delegate-from">
			<label>delegate to</label>
			<input type="text" placeholder="" id="delegate-to">
			<label>delegate value</label>
			<input type="text" placeholder="" id="delegate-value">

			<button class="button" @click="initiateTx(gcoin.transferFrom(callbackUpdateStatus))">submit</button>
		</div>
		</Panel>

		<Panel name="approve">Approve
		<div slot="content">
			<label>approve spender</label>
			<input type="text" placeholder="" id="approve-spender">
			<label>approve value</label>
			<input type="text" placeholder="" id="approve-value">

			<button class="button" @click="initiateTx(gcoin.approve(callbackShowResult))">submit</button>

		</div>
		</Panel>
		<Panel name="allownce">Allownce
		<div slot="content">
			<label>allowance spender</label>
			<input type="text" placeholder="" id="allowance-spender">
			<label>allowance owner</label>
			<input type="text" placeholder="" id="allowance-owner">

			<button class="button" @click="gcoin.refreshAllowance(callbackRefreshAllowence)">submit</button>
		</div>
	</Panel>

		<div class="balance">
			<p id="balance"></p>
		</div>

		<div class="status">
			<p id="status" style="visibility:hidden">status</p>
		</div>


	<!-- </div> -->
	</Collapse>
        </Card>
</template>
<style scoped>
.contract-info-container {
  width:100%;
  max-height: 550px;
  /*height: 550px;*/
  overflow: scroll;
}
  label {
    margin-right: 2%;
  }

  input {
    margin-right: 4%;
  }
.balance{
	margin-left: 4%;
}
.status{
	margin-left: 4%;
}
</style>
<script>
	//import { vm } from "../main.js";
	import { Gcoin } from '../scripts/gcoin.js';
	export default {
		name: "Trans",

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