<template>
	<div class="block">
		<h1>This is the block page: {{block.height}}</h1>
		<br>


		<div v-if="error">
			<Alert type="error" show-icon>
				An error prompt
				<span slot="desc">
					{{errorInfo}}
				</span>
			</Alert>
		</div>
		<div v-else>
			<div class="detail-raw">
				<div class="detail-item">Height: </div> 
				{{block.height}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">Timestamp: </div> 
				{{block.timestamp}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">Transactions: </div> 
				{{block.transactions}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">Miner: </div> 
				{{block.miner}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">Difficulty: </div> 
				{{block.difficulty}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">TotalDifficulty: </div> 
				{{block.totalDifficulty}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">Size: </div> 
				{{block.size}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">GasUsed: </div> 
				{{block.gasUsed}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">GasLimit: </div> 
				{{block.gasLimit}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">ExtraData: </div> 
				{{block.extraData}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">Hash: </div> 
				{{block.hash}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">ParentHash: </div> 
				{{block.parentHash}}
			</div>
			<div class="detail-raw" v-if="uncles">
				<div class="detail-item">Sha3Uncles: </div> 
				{{block.sha3Uncles}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">StateRoot: </div> 
				{{block.stateRoot}}
			</div>
			<div class="detail-raw">
				<div class="detail-item">Nonce: </div> 
				{{block.nonce}}
			</div>



		</div>


	</div>
</template>

<style>
.block-row {

}
.detail-item {
	font-weight: 700!important;
	display: inline-block;
}

</style>

<script>
	import { BlockInfoCtrl } from '../../scripts/explorer/blockInfoController.js';
	export default {
		name: 'BlockInfoCtrl',
		data() {
			return{
				block: null,
				error: false,
				errorInfo: "",
				uncles: true,
			}
		},
		methods: {

			getBlock() {
				const bid = document.getElementById("bid").value;

				this.blockInfoController.getBlock(bid, this.displayBlockDetails, this.failureCallback);
			},

			/* UI Callback  */

			displayBlockDetails(block){
				this.block=block;
				console.log(block);
			},


			failureCallback(errors) {
				this.error=true;
				this.errorInfo=errors;
				console.log(errors);
			}

		},

		created(){
			this.blockInfoController = BlockInfoCtrl;
			
		},

		mounted: function(){
			this.blockInfoController.getBlock(this.$route.params.id, this.displayBlockDetails, this.failureCallback);
			
		}
	}
</script>