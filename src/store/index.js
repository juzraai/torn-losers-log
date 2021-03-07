import Vue from 'vue'
import Vuex from 'vuex'
import LZString from 'lz-string'
import tornApi from '../tornApi'

Vue.use(Vuex)

const LOCAL_STORAGE_KEY = 'store'

function loadFromStorage() {
	const lz = localStorage.getItem(LOCAL_STORAGE_KEY)
	const json = LZString.decompressFromUTF16(lz)
	return JSON.parse(json)
}

function saveToStorage(state) {
	const json = JSON.stringify(state)
	const lz = LZString.compressToUTF16(json)
	localStorage.setItem(LOCAL_STORAGE_KEY, lz)
	console.log(`[Store] Compressed state from ${json.length} to ${lz.length} (${Math.round(lz.length / json.length * 100)}%) characters.`)
}

function groupPredicate(a) {
	return group => group.defender_id === a.defender_id && group.paid === a.paid
}

function newGroup(a) {
	const { defender_id, paid, timestamp_ended } = a
	return {
		attacks: [a],
		defender_id,
		paid,
		timestamp_ended,
		timestamp_started: a.timestamp_ended, // sic! we are using the "ended" timestamp of attacks!
	}
}

function updateGroup(group, a) {
	group.attacks.push(a)
	group.timestamp_ended = Math.max(group.timestamp_ended, a.timestamp_ended)
	group.timestamp_started = Math.min(group.timestamp_started, a.timestamp_ended)
	return group
}

const store = new Vuex.Store({
	state: {
		apiKey: null, // TORN API key
		lastUpdate: null,
		losses: [],
		names: {}, // TORN player ID->name dictionary
		playerId: null, // TORN player ID (which the API key belongs to)
	},
	mutations: {
		init(state) {
			if (localStorage.getItem('store')) {
				const obj = loadFromStorage()
				const newState = Object.assign(state, obj)
				this.replaceState(newState)
			}
		},
		setApiKey(state, apiKey) {
			state.apiKey = apiKey
		},
		setLastUpdate(state) {
			state.lastUpdate = new Date().getTime()
		},
		setLosses(state, losses) {
			state.losses = losses
		},
		setPlayerId(state, playerId) {
			state.playerId = playerId
		},
		setPlayerName(state, payload) {
			const { player_id, name } = payload
			Vue.set(state.names, player_id, name)
		},
	},
	getters: {
		clients(state) {
			return state.losses.reduce((groups, a) => {
				const i = groups.findIndex(groupPredicate(a))
				if (i > -1) {
					groups[i] = updateGroup(groups[i], a)
				} else {
					groups.push(newGroup(a))
				}
				return groups
			}, [])
		},
		sessions(state) {
			return state.losses.reduce((groups, a) => {
				const group = groups[groups.length - 1]
				if (group && groupPredicate(a)(group)) {
					updateGroup(group, a)
				} else {
					groups.push(newGroup(a))
				}
				return groups
			}, [])
		}
	},
	actions: {
		async login(context, apiKey) {
			context.commit('setApiKey', apiKey)
			const response = await tornApi.fetchBasic(apiKey)
			const { player_id, name } = response
			context.commit('setPlayerId', player_id)
			context.commit('setPlayerName', { player_id, name })
		},
		async fetchLosses(context) {
			const { apiKey, playerId } = context.state
			const response = await tornApi.fetchAttacks(apiKey)
			const losses = response.filter(a =>
				a.attacker_id === playerId &&
				a.result === 'Lost'
			).map(({ code, defender_id, timestamp_ended }) => ({
				code, defender_id, timestamp_ended
			}))
			losses.reverse()
			context.commit('setLosses', losses)
			context.commit('setLastUpdate')
		},
		async resolveName(context, playerId) {
			const { apiKey } = context.state
			const response = await tornApi.fetchBasic(apiKey, playerId)
			const { name } = response
			context.commit('setPlayerName', { player_id: playerId, name })
		},
	},
})

store.subscribe((mutation, state) => {
	console.log('[Store] Mutation', mutation)
	console.log('[Store] Saving new state', state)
	saveToStorage(state)
})

export default store
