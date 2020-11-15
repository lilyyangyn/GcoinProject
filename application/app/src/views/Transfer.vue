<template>
	<div class="transfer">
		<h1>This is the transfer page</h1>

		<div class="transfer">
			<input type="text" placeholder="transfer to" id="transfer-to" v-model="transferTo">
			<input type="text" placeholder="transfer-value" id="transfer-value">
			<button class="button" @click="transfer()">submit</button>
		</div>

		<div class="delegate">
			<input type="text" placeholder="delegate-from" id="delegate-from">
			<input type="text" placeholder="delegate-to" id="delegate-to">
			<input type="text" placeholder="delegate-value" id="delegate-value">
			<button class="button" @click="transferFrom()">submit</button>
		</div>

		<div class="approve">
			<p id="approve-spender">2</p>
			<p id="approve-value">2</p>
		</div>

		<div class="allownce">
			<p id="allowance-spender">2</p>
			<p id="allowance-owner">2</p>
		</div>

		<div class="balance">
			<p id="balance">3</p>
		</div>

		<div class="status">
			<p id="status">"status"</p>
		</div>


	</div>
</template>

<script>
	import '../../js/gcoin.js'

	export default {
		name: 'transfer',
		data() {
			return{
				transferTo: ""
			}
			
		},
		method: {
			transfer(){
				
				const to = document.getElementById("transfer-to").value;
				const value =  parseInt(document.getElementById("transfer-value").value);

				this.setStatus("Initiating transaction... (please wait)");

				const { transfer } = this.meta.methods;
				transfer(to, value).call();

				this.setStatus("Transaction complete!");
				this.refreshBalance();
			}
		}
		
		
	}
</script>