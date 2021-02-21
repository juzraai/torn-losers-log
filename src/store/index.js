import Vue from 'vue'
import Vuex from 'vuex'
import LZString from 'lz-string'
import tornApi from '../tornApi'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		apiKey: null, // TORN API key
		names: {}, // TORN player ID->name dictionary
		playerId: null, // TORN player ID (which the API key belongs to)
	},
	mutations: {
		init(state) {
			if (localStorage.getItem('store')) {
				const lz = localStorage.getItem('store')
				const json = LZString.decompressFromUTF16(lz)
				const obj = JSON.parse(json)
				const newState = Object.assign(state, obj)
				this.replaceState(newState)
			}
		},
		setApiKey(state, apiKey) {
			state.apiKey = apiKey
		},
		setPlayerId(state, playerId) {
			state.playerId = playerId
		},
		setPlayerName(state, payload) {
			const { player_id, name } = payload
			state.names[player_id] = name
		}
	},
	actions: {
		async login(context, apiKey) {
			context.commit('setApiKey', apiKey)
			const response = await tornApi.fetchBasic(context.state.apiKey)
			const { player_id, name } = response
			context.commit('setPlayerId', player_id)
			context.commit('setPlayerName', { player_id, name })
		},
	},
})

store.subscribe((mutation, state) => {
	console.log('[Store] Mutation', mutation)
	console.log('[Store] Saving new state', state)
	const json = JSON.stringify(state)
	const lz = LZString.compressToUTF16(json)
	localStorage.setItem('store', lz)
	console.log(`[Store] Compressed state from ${json.length} to ${lz.length} (${Math.round(lz.length / json.length * 100)}%) characters.`)
})

export default store
