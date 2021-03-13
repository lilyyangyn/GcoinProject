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

export { vm }
