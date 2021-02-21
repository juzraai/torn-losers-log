import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		apiKey: null
	},
	mutations: {
		init(state) {
			if(localStorage.getItem('store')) {
				const json = localStorage.getItem('store')
				const obj = JSON.parse(json)
				const newState = Object.assign(state, obj)
				this.replaceState(newState)
			}
		},
		setApiKey(state, apiKey) {
			state.apiKey = apiKey
		}
	},
	actions: {
	},
	modules: {
	}
})

store.subscribe((mutation, state) => {
	console.log('STATE MODIFIED', JSON.stringify(state))
	localStorage.setItem('store', JSON.stringify(state))
})

export default store
