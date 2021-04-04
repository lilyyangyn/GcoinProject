<template>
	<div class="block" >
		<h1 v-if="block" style="text-align: center">Block: {{block.height}}</h1>
		<Tabs type="card" style="width: 85%;margin: 0 auto;">


		<div v-if="error">
			<Alert type="error" show-icon>
				An error prompt
				<span slot="desc">
					{{errorInfo}}
				</span>
			</Alert>
		</div>
		<div v-else style="margin: 0 auto;">
			<Card class="block" v-if="block">
				<List border>
			<ListItem>
				<div class="detail-item">Height: </div> 
				{{block.height}}
			</ListItem>
			<ListItem>
				<div class="detail-item">Timestamp: </div> 
				{{block.timestamp}}
			</ListItem>
			<!-- <ListItem>
				<div class="detail-item">Transactions: </div> 
				{{block.transactions.length}}
			</ListItem> -->
			
				<Collapse simple style="width: 100%;">
				<Panel><Strong>Transactions:</Strong> {{block.transactions.length}}
				<div slot="content" v-for="txn in block.transactions" :key="txn.hash">
				<a @click="getTransaction(txn)">{{txn}}</a>
				</div>
				</Panel>
				</Collapse>
			
			<ListItem>
				<div class="detail-item">Miner: </div> 
				{{block.miner}}
			</ListItem>
			<ListItem>
				<div class="detail-item">Difficulty: </div> 
				{{block.difficulty}}
			</ListItem>
			<ListItem>
				<div class="detail-item">TotalDifficulty: </div> 
				{{block.totalDifficulty}}
			</ListItem>
			<ListItem>
				<div class="detail-item">Size: </div> 
				{{block.size}}
			</ListItem>
			<ListItem>
				<div class="detail-item">GasUsed: </div> 
				{{block.gasUsed}}
			</ListItem>
			<ListItem>
				<div class="detail-item">GasLimit: </div> 
				{{block.gasLimit}}
			</ListItem>
			<ListItem>
				<div class="detail-item">ExtraData: </div> 
				{{block.extraData}}
			</ListItem>
			<ListItem>
				<div class="detail-item">Hash: </div> 
				{{block.hash}}
			</ListItem>
			<ListItem>
				<div class="detail-item">ParentHash: </div> 
				{{block.parentHash}}
			</ListItem>
			<ListItem v-if="uncles">
				<div class="detail-item">Sha3Uncles: </div> 
				{{block.sha3Uncles}}
			</ListItem>
			<ListItem>
				<div class="detail-item">StateRoot: </div> 
				{{block.stateRoot}}
			</ListItem>
			<ListItem>
				<div class="detail-item">Nonce: </div> 
				{{block.nonce}}
			</ListItem>
		</List>
		</Card>



		</div>


</Tabs>
	</div>
</template>

<style>
.block-row {

}
.detail-item {
	font-weight: 700!important;
	display: inline-block;
}
.block{
	margin-bottom: 2%

}

</style>

<script>
	import ExplorerCtrl from '@/components/Explorer.vue';
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
			},


			failureCallback(errors) {
				this.error=true;
				this.errorInfo=errors;
				console.log(errors);
			},

			getTransaction(thash) {
				this.$router.push({
					name: 'Explorer.TxDetails',
					params: {
						id: thash,
					}
				});
			},

		},

		created(){
			this.blockInfoController = ExplorerCtrl.blockInfoController;
			
		},

		mounted: function(){
			this.blockInfoController.getBlock(this.$route.params.id, this.displayBlockDetails, this.failureCallback);
			
		}
	}
</script>