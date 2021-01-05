import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Web3 from "web3";

Vue.config.productionTip = false;
Vue.use(ViewUI);

var vm = new Vue({
	router,
	store,
	render: h => h(App),

}).$mount('#app')

if (window.ethereum) {
	// use MetaMask's provider
	vm.web3 = new Web3(window.ethereum);
	window.ethereum.enable(); // get permission to access accounts
} else {
	console.warn(
			"No web3 detected. Falling back to http://127.0.0.1:8545.",
		);
	vm.web3 = new Web3(
			new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
		);
}
console.log("Connedcted to the chain successfully")


export { vm }
