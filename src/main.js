import Vue from 'vue'
import { NavbarPlugin, TooltipPlugin } from 'bootstrap-vue'
import VueTimeago from 'vue-timeago'
import App from './App.vue'
import router from './router'
import store from './store'
import './scss/style.scss'

Vue.config.productionTip = false

Vue.use(NavbarPlugin)
Vue.use(TooltipPlugin)

Vue.use(VueTimeago, {})

store.commit('init') // has to be called before router

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
