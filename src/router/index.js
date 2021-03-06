import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function r(path, name) {
	return {
		path,
		name,
		component: () => import(`../views/${name}.vue`)
	}
}

export const routes = [
	r('/', 'Losses'),
	r('/sessions', 'Sessions'),
	r('/clients', 'Clients'),
	r('/stats', 'Stats'),
]

const router = new VueRouter({
	routes
})

export default router
