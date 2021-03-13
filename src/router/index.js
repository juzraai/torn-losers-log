import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

function r(path, name, requiresApiKey/*, icon, tooltip*/) {
	return {
		path,
		name,
		meta: { requiresApiKey },
		/*icon,
		tooltip,*/
		component: () => import(`../views/${name}.vue`)
	}
}

export const routes = [
	r('/', 'Dashboard', true),
	r('/login', 'Login')
	// TODO public about page (readme like)
	// TOOD maybe a help page too

	/*r('/losses', 'Losses', 'fa-list', 'List of individual losses, just like on TORN or YATA.'),
	r('/sessions', 'Sessions', 'fa-layer-group', 'Groups of consecutive losses to the same client with the same paid status.'),
	r('/clients', 'Clients', 'fa-user', 'Losses aggregated by client.'),*/
	//r('/stats', 'Stats', 'fa-chart-bar'),
]

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	const requiresApiKey = to.matched.some(r => r.meta.requiresApiKey)
	if (requiresApiKey && !store.state.apiKey) {
		return next('/login')
	}
	if (to.path === '/login' && store.state.apiKey) {
		return next('/')
	}
	next()
})

export default router
