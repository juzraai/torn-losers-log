import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

function r(path, name, requiresApiKey) {
	return {
		path,
		name,
		meta: { requiresApiKey },
		component: () => import(`../views/${name}.vue`)
	}
}

export const routes = [
	r('/', 'Dashboard', true),
	r('/changelog', 'Changelog'),
	r('/login', 'Login'),
	r('/import', 'Import')
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
