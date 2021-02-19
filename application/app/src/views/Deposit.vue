<template>
	<div class="cross-chain-deposit">
		<h1>This is the cross chain deposit page</h1>

	</div>
</template>

<script>
	import Web3 from "web3";
 
	import { USDTS } from '../scripts/crosschain/parentchain/USDTS.js';
	import { USDTExchcoinExchange } from '../scripts/crosschain/parentchain/USDTExchcoinExchange.js';
	import { BridgeableToken } from '../scripts/crosschain/parentchain/BridgeableToken.js';
	export default {
		name: 'CrossChainDeposit',
		methods: {

			async transferToChildChain() {

				const value = document.getElementById("deposit-value").value;
				var self = this;

				// USDT approval
				var currentAllowance = 0;
				await this.USDT.refreshAllowance(function(error, result) {
					if (!error) {
						currentAllowance = result;
					} 
					self.refreshUSDTAllowanceCallback(error, result);
				});
				if (currentAllowance < value) {
					await
					 this.USDT.approve(value, function(error, result) {
						if (!error) {
							currentAllowance = result;
						} 
						self.refreshUSDTAllowanceCallback(error, result);
					})
				}
				if (currentAllowance < value) {
					this.popMsg("Fail to allow the platform to spend your USDT. \nPlease try again or do it explicitly.");
					return;
				}

				// USDT to Exchcoin
				var successful = true;
				await this.USDTExchcoinExchange.USDTToExchcoin(value, function(error, result) {
					if (error) {
						console.error(error);
						successful = false;
					}
					self.refreshUSDTBalanceCallback(error, result);
					self.refreshSCUSDTLedgerBalanceCallback(error, result);
				})
				if (!successful) {
					this.popMsg("Fail to reserve Exchcoin.\nPlease try again or do it explicitly.");
					return;
				}

				// Crosschain
				await this.BridgeableToken.transferToChildChain(value, function(error, result) {
					if (!error && result) {
						this.popMsg("Succeed!");
					} else {
						this.popMsg("Fail to transfer Exchcoin to permissioned chain.\nPlease try again or do it explicitly.");
					}

					self.refreshUSDTBalanceCallback(error, result);
					self.refreshSCUSDTLedgerBalanceCallback(error, result);
					self.refreshExchcoinBalanceCallback(error, result);
				})
			},

			async unlockAccount() {
				account = document.getElementById("account");
				password = document.getElementById("password");
				web3.personal.unlockAccount(account, password, (err) => {
					if (err) {
						popMsg("Fail to unlock your account")
					}
				});
			}

			/* UI Methods */ 

			popMsg(error) {
				// TODO
				const popDetail = document.getElementById("popDetail");
				if (popDetail) {
					popDetail.innerHTML = error;
				}
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