import Vue from 'vue'
import { TooltipPlugin } from 'bootstrap-vue'
import VueTimeago from 'vue-timeago'
import App from './App.vue'
import router from './router'
import store from './store'
import './scss/style.scss'

Vue.config.productionTip = false

Vue.use(TooltipPlugin)

Vue.use(VueTimeago, {})

new Vue({
	router,
	store,
	render: h => h(App),
	beforeCreate() {
		this.$store.commit('init')
	}
}).$mount('#app')
