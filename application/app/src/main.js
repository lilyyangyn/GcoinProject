import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

var vm = new Vue({
	router,
	store,
	render: h => h(App),

	data : {
		web3: null,
	}
}).$mount('#app')

import Web3 from "web3";
vm.web3 = new Web3(
			new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
		);
console.log("Connedcted to the chain successfully")

export { vm }
