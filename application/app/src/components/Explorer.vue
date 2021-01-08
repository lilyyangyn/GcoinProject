<template>
  <div id="app">
    <router-view/>
      
  </div>
</template>

<script>
	import { BlockInfoCtrl } from '../scripts/explorer/blockInfoController.js';
	import { TransactionInfoCtrl } from '../scripts/explorer/transactionInfoController.js';

	export default {
		name: 'ExplorerCtrl',

		blockInfoController: BlockInfoCtrl,
		transactionInfoController: TransactionInfoCtrl,
	}

</script>