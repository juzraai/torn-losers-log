import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function r(path, name, icon, tooltip) {
	return {
		path,
		name,
		icon,
		tooltip,
		component: () => import(`../views/${name}.vue`)
	}
}

export const routes = [
	r('/', 'Losses', 'fa-list', 'List of individual losses, just like on TORN or YATA.'),
	r('/sessions', 'Sessions', 'fa-layer-group', 'Groups of consecutive losses to the same client with the same paid status.'),
	r('/clients', 'Clients', 'fa-user', 'Losses aggregated by client.'),
	//r('/stats', 'Stats', 'fa-chart-bar'),
]

const router = new VueRouter({
	routes
})

export default router
