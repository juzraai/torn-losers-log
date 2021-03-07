import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function r(path, name, icon) {
	return {
		path,
		name,
		icon,
		component: () => import(`../views/${name}.vue`)
	}
}

export const routes = [
	r('/', 'Losses', 'fa-list'),
	r('/sessions', 'Sessions', 'fa-layer-group'),
	r('/clients', 'Clients', 'fa-user'),
	r('/stats', 'Stats', 'fa-chart-bar'),
]

const router = new VueRouter({
	routes
})

export default router
