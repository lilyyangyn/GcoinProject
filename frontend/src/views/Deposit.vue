<template>
	<div class="cross-chain-deposit">
		<h1>This is the cross chain deposit page</h1>
		<button @click="transferToChildChain()">click8</button>
	</div>
</template>

<script>
	import {web3Util} from "@/scripts/web3Util/web3Util";
 
	import { USDTS } from '@/scripts/homechain/USDTS';
	import { USDTExchcoinExchange } from '@/scripts/homechain/USDTExchcoinExchange';
	import { BridgeableToken_Home } from '@/scripts/homechain/BridgeableToken';
	import { BridgeableToken_Child } from '@/scripts/contracts/BridgeableToken'
	import { GcoinExchcoinExchange } from '@/scripts/contracts/GcoinExchcoinExchange'
	import {vm} from "@/main";

	export default {
		name: 'CrossChainDeposit',
		data() {
			return {
				depositValue: 1,
			}
		},
		methods: {

			async transferToChildChain() {
				let self = this;

				// USDT approval
				let currentAllowance = 0;
				await USDTS.refreshAllowance(function(error, result) {
					if (!error) {
						currentAllowance = result;
					} else {
						console.error(error);
						console.log(result);
					}
					
					self.refreshUSDTAllowanceCallback(error, result);
				});
				
				if (currentAllowance < this.depositValue) {
					console.log("Approval starts!");
					await USDTS.approve(this.depositValue, () => {
							self.$Message.success("Approval succeeds!")
							console.log("Approval succeeds!");
							self.exchcoinExchange();
					}, (error) => {
						console.error(error);
						self.$Message.error("Fail to allow the platform to spend your USDT. \nPlease try again or do the allowance explicitly.");
					});
				} else {
					this.exchcoinExchange();
				}
			},

			exchcoinExchange() {
				console.log("Exchcoin-exchange starts!");
				let self = this;
				USDTExchcoinExchange.USDTToExchcoin(this.depositValue, () => {
					self.$Message.success("Exchcoin-exchange succeeds!");
					console.log("Exchcoin-exchange succeeds!");
					vm.$emit('USDTBalanceUpdate');
					vm.$emit('parentChainExchgCoinBalanceUpdate');
					self.bridgeableTokenTransfer();
				}, (error) => {
					console.error(error);
					self.$Message.error("Fail to reserve Exchcoin.\nPlease try again or do the reservation explicitly.");
				});
			},

			bridgeableTokenTransfer() {
				let self = this;
				console.log("Crosschain-trial starts!");
				BridgeableToken_Home.transferToChildChain(this.depositValue, this.getSignatureAndExecute, () => {
					self.$Message.success("Start crosschain deposit!");
					console.log("Start crosschain deposit!");
					vm.$emit('parentChainExchgCoinBalanceUpdate');
				}, (error) => {
					console.error(error);
					self.$Message.error("Fail to start crosschain transfer.\nPlease try again or do the transfer explicitly.");
				});
			},

			async getSignatureAndExecute(resolved){
		      //trim the message with signature request
		      let data = resolved.logs[4].data;
		      let topic1 = resolved.logs[4].topics[1].slice(2);
		      let topic1Index = data.indexOf(topic1);
		      let encodeData = "0x" + data.slice(topic1Index,data.length-22);
		      console.log("encode data: "+encodeData);

		      //get signature
		      let signature = null;
		      while(signature == null){
		        console.log("while looping up");
		        // periodically asking for signature by sleeping the thread
		        await new Promise(resolve => setTimeout(resolve, 15000));
		        console.log("finish sleep");
		        await web3Util.getSignature(encodeData).then((resolved) => {
		          console.log("resolved: " + encodeData);
		          signature = resolved;
		          console.log("signature: " + signature);
		        }).catch(error => {
		          console.log(error);
		        });
		      }

		      //pass the signature and message to the chain
		      console.log("Sign Execution starts!");
		      let self = this;
		      await web3Util.signExecute(encodeData, signature, () => {
		      	console.log("Sign Execution succeeds!");
		      	vm.$emit('childChainExchgCoinBalanceUpdate');
		      	self.approveGcoinExchange();
		      }, (error) => {
		      	console.error(error);
		      	self.$Message.error("Fail to sign execution");
		      });

		    },

		    approveGcoinExchange() {
		    	console.log("Approve-Gcoin-exchange starts");
		    	let self = this;
		    	BridgeableToken_Child.approve(this.depositValue, () => {
		    		self.$Message.success("Approve-Gcoin-exchange succeeds!");
					console.log("Approve-Gcoin-exchange succeeds!");
					self.gcoinExchange()
		    	}, (error) => {
		    		console.error(error);
		    		self.$Message.error("Fail to approve Gcoin-exchange. \n Please try again or do the approval explicitly");
		    	});
		    },

    		gcoinExchange() {
    			console.log("Gcoin-exchange starts!");
				let self = this;
				GcoinExchcoinExchange.exchcoinToGcoin(this.depositValue, () => {
					self.$Message.success("Gcoin-exchange succeeds!");
					console.log("Gcoin-exchange succeeds!");
					vm.$emit('childChainExchgCoinBalanceUpdate');
					vm.$emit('GcoinBalanceUpdate');
				}, (error) => {
					console.error(error);
					self.$Message.error("Fail to reserve Gcoin.\nPlease try again or do the reservation explicitly.");
				});
    		},

			/* UI Callback */

			refreshUSDTAllowanceCallback(error, result) {
				if (!error) {
					// const USDTAllowanceElement = document.getElementById("usdt-allowance");
					// USDTAllowanceElement.innerHTML = result;
					console.log("USDTAllowance: "+result)
				} else {
					this.$Message.error("Fail to get USDT allowance.");
				}
			},

		},
	}
</script>