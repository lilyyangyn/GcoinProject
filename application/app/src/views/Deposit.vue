<template>
	<div class="cross-chain-deposit">
		<h1>This is the cross chain deposit page</h1>

	</div>
</template>

<script>
	import Web3 from "web3";
 
	import { USDTS } from '@/scripts/crosschain/parentchain/USDTS';
	import { USDTExchcoinExchange } from '@/scripts/crosschain/parentchain/USDTExchcoinExchange';
	import { BridgeableToken } from '@/scripts/crosschain/parentchain/BridgeableToken';

	export default {
		name: 'CrossChainDeposit',
		data() {
			return {
				depositValue: 0,
			}
		},
		methods: {

			async transferToChildChain() {

				var self = this;

				// USDT approval
				var currentAllowance = 0;
				await USDT.refreshAllowance(function(error, result) {
					if (!error) {
						currentAllowance = result;
					} 
					self.refreshUSDTAllowanceCallback(error, result);
				});
				if (currentAllowance < this.depositValue) {
					await USDT.approve(this.depositValue, function(error, result) {
						if (!error) {
							currentAllowance = result;
						} 
						self.refreshUSDTAllowanceCallback(error, result);
					})
				}
				if (currentAllowance < this.result) {
					this.$Message.error("Fail to allow the platform to spend your USDT. \nPlease try again or do the allowance explicitly.")
					return;
				}

				// USDT to Exchcoin
				var successful = true;
				await USDTExchcoinExchange.USDTToExchcoin(value, function(error, result) {
					if (error) {
						console.error(error);
						successful = false;
					}
				});
				USDTExchcoinExchange.refreshUSDTBalance(this.refreshUSDTBalanceCallback);
				USDTExchcoinExchange.refreshSCUSDTLedgerBalance(this.refreshSCUSDTLedgerBalanceCallback)

				if (!successful) {
					this.$Message.error("Fail to reserve Exchcoin.\nPlease try again or do the reservation explicitly.")
					return;
				}

				// Crosschain
				await BridgeableToken.transferToChildChain(value, function(error, result) {
					if (!error && result) {
						alert("Succeed!");
					} else {
						this.$Message.error("Fail to transfer Exchcoin to permissioned chain.\nPlease try again or do the transfer explicitly.");
					}
				})
				USDTExchcoinExchange.refreshUSDTBalance(this.refreshUSDTBalanceCallback);
				USDTExchcoinExchange.refreshSCUSDTLedgerBalance(this.refreshSCUSDTLedgerBalanceCallback)
				USDTExchcoinExchange.refreshExchcoinBalance(this.refreshExchcoinBalanceCallback)
			},

			/* UI Callback */

			refreshUSDTAllowanceCallback(error, result) {
				if (!error) {
					const USDTAllowanceElement = document.getElementById("usdt-allowance");
					USDTAllowanceElement.innerHTML = result;
				} else {
					this.popMsg("Fail to get USDT allowance.");
				}
			},

			refreshUSDTBalanceCallback(error, result) {
				if (!error) {
					const USDTBalanceElement = document.getElementById("usdt-balance");
					USDTBalanceElement.innerHTML = result;
				} else {
					this.popMsg("Fail to get USDT balance.");
				}
			},

			refresExchcoinBalanceCallback(error, result) {
				if (!error) {
					const ExchcoinBalanceElement = document.getElementById("exchcoin-balance");
					ExchcoinBalanceElement.innerHTML = result;
				} else {
					this.popMsg("Fail to get Exchcoin balance.");
				}
			},

			refreshSCUSDTLedgerBalanceCallback(error, result) {
				if (!error) {
					const USDTLedgerBalanceElement = document.getElementById("usdt-ledger");
					USDTLedgerBalanceElement.innerHTML = result;
				} else {
					this.popMsg("Fail to get USDT ledger balance in exchange balance.");
				}
			}

		},

		created(){
			this.USDTS = USDTS;
			this.USDTExchcoinExchange = USDTExchcoinExchange;
			this.BridgeableToken = BridgeableToken;
		},

		mounted: function(){
			var web3 = new Web3(
				new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/7abfcd3ee73b406ea84fd1bb5f10a45d"),
			);
			console.log("Connedcted to Ropsten successfully");

			USDTS.web3 = web3;
			USDTS.start();
			USDTExchcoinExchange.web3 = web3;
			USDTExchcoinExchange.start();
			BridgeableToken.web3 = web3;
			BridgeableToken.start();
			


		}
	}
</script>