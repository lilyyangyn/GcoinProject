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
	import { BridgeableToken } from '@/scripts/homechain/BridgeableToken';

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
					}, () => {
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
					self.bridgeableTokenTransfer();
				}, () => {
					self.$Message.error("Fail to reserve Exchcoin.\nPlease try again or do the reservation explicitly.");
				});
			},

			bridgeableTokenTransfer() {
				console.log("Crosschain-trial starts!");
				BridgeableToken.transferToChildChain(this.depositValue, () => {
					self.$Message.success("Start crosschain deposit!");
					console.log("Start crosschain deposit!");
					USDTExchcoinExchange.refreshUSDTBalance(self.refreshUSDTBalanceCallback);
					USDTExchcoinExchange.refreshSCUSDTLedgerBalance(self.refreshSCUSDTLedgerBalanceCallback);
					USDTExchcoinExchange.refreshExchcoinBalance(self.refreshExchcoinBalanceCallback);
				}, () => {
					self.$Message.error("Fail to start crosschain transfer.\nPlease try again or do the transfer explicitly.");
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

			refreshUSDTBalanceCallback(error, result) {
				if (!error) {
					// const USDTBalanceElement = document.getElementById("usdt-balance");
					// USDTBalanceElement.innerHTML = result;
					console.log("USDTBalance: "+result)
				} else {
					this.$Message.error("Fail to get USDT balance.");
				}
			},

			refreshExchcoinBalanceCallback(error, result) {
				if (!error) {
					// const ExchcoinBalanceElement = document.getElementById("exchcoin-balance");
					// ExchcoinBalanceElement.innerHTML = result;
					console.log("ExchcoinBalance: "+result)
				} else {
					this.$Message.error("Fail to get Exchcoin balance.");
				}
			},

			refreshSCUSDTLedgerBalanceCallback(error, result) {
				if (!error) {
					// const USDTLedgerBalanceElement = document.getElementById("usdt-ledger");
					// USDTLedgerBalanceElement.innerHTML = result;
					console.log("USDTLedgerBalance: "+result)
				} else {
					this.$Message.error("Fail to get USDT ledger balance in exchange balance.");
				}
			}

		},
	}
</script>