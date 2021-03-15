import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueTimeago from 'vue-timeago'
import { NavbarPlugin, TooltipPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './scss/style.scss'

Vue.config.productionTip = false

Vue.use(VueMeta)
Vue.use(VueTimeago, {})

Vue.use(NavbarPlugin)
Vue.use(TooltipPlugin)

store.commit('init') // has to be called before router

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
