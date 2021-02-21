import Vue from 'vue'
import Vuex from 'vuex'
import LZString from 'lz-string'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		apiKey: null
	},
	mutations: {
		init(state) {
			if(localStorage.getItem('store')) {
				const lz = localStorage.getItem('store')
				const json = LZString.decompressFromUTF16(lz)
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
	const json = JSON.stringify(state)
	const lz = LZString.compressToUTF16(json)
	localStorage.setItem('store', lz)
	console.log(`Compressed state from ${json.length} to ${lz.length} characters.`)
})

export default store
