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
	group.oldest |= a.oldest
	return group
}

const store = new Vuex.Store({
	state: {
		apiKey: null, // TORN API key
		lastUpdate: null, // Timestamp (Number) of last fetchLosses call
		losses: [], // TORN attacks filtered to losses and necessary fields
		names: {}, // TORN player ID -> name dictionary
		paidUntil: {}, // TORN player ID -> timestamp
		playerId: null, // TORN player ID (which the API key belongs to)
		tab: 0, // selected tab index in LogWidget

		// not persisted:
		hideClients: false,
		loading: false,
	},
	mutations: {
		init(state) {
			if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
				const obj = loadFromStorage()
				const newState = Object.assign(state, obj)
				this.replaceState(newState)
			}
		},
		setApiKey(state, apiKey) {
			state.apiKey = apiKey
		},
		setHideClients(state, hide) {
			state.hideClients = hide
		},
		setLastUpdate(state) {
			state.lastUpdate = new Date().getTime()
		},
		setLoading(state, loading) {
			state.loading = loading
		},
		setLosses(state, losses) {
			state.losses = losses
		},
		setPaidUntil(state, payload) {
			const { playerId, timestamp } = payload
			Vue.set(state.paidUntil, playerId, timestamp)
		},
		setPlayerId(state, playerId) {
			state.playerId = playerId
		},
		setPlayerName(state, payload) {
			const { player_id, name } = payload
			Vue.set(state.names, player_id, name)
		},
		setTab(state, tab) {
			state.tab = tab
		}
	},
	getters: {
		losses(state) {
			return state.losses.map((a, i) => {
				a.oldest = i === state.losses.length - 1
				a.paid = state.paidUntil[a.defender_id] >= a.timestamp_ended
				return a
			})
		},
		days(_, getters) {
			return getters.losses.reduce((days, a) => {
				const day = new Date(a.timestamp_ended * 1000).toISOString().split('T')[0]
				days[day] = (days[day] || 0) + 1
				return days
			}, {})
		},
		avgLossesPerDay(_, getters) {
			const counts = Object.values(getters.days);
			counts.shift(); // removing newest day as it's likely incomplete
			counts.pop(); // removing oldest day as it's likely incomplete
			const avg = counts.reduce((sum, v) => (sum += v), 0) / counts.length;
			return Math.round(avg * 10) / 10;
		},
		clients(_, getters) {
			return getters.losses.reduce((groups, a) => {
				const i = groups.findIndex(groupPredicate(a))
				if (i > -1) {
					groups[i] = updateGroup(groups[i], a)
				} else {
					groups.push(newGroup(a))
				}
				return groups
			}, [])
		},
		unpaidClients(_, getters) {
			return getters.clients.filter(g => !g.paid)
		},
		sessions(_, getters) {
			return getters.losses.reduce((groups, a) => {
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
		clearData() {
			localStorage.removeItem(LOCAL_STORAGE_KEY)
			window.location.reload()
		},
		async login(context, apiKey) {
			context.commit('setLoading', true)
			context.commit('setApiKey', apiKey)
			const response = await tornApi.fetchBasic(apiKey)
			const { player_id, name } = response
			context.commit('setPlayerId', player_id)
			context.commit('setPlayerName', { player_id, name })
			context.commit('setLoading', false)
		},
		async fetchLosses(context) {
			context.commit('setLoading', true)
			const { apiKey, playerId } = context.state
			const response = await tornApi.fetchAttacks(apiKey)
			const losses = response.filter(a =>
				a.attacker_id === playerId &&
				a.result === 'Lost'
			).map(({ code, defender_id, timestamp_ended }) => ({
				code, defender_id, timestamp_ended
			}))
			losses.reverse()
			// TODO auto-clean paidUntil dict:
			// 1) map losses to defID array
			// 2) filter paidUntil keys to those not included
			// 3) delete these keys from paidUntil
			context.commit('setLosses', losses)
			context.commit('setLastUpdate')
			context.commit('setLoading', false)
		},
		async resolveName(context, playerId) {
			context.commit('setLoading', true)
			const { apiKey } = context.state
			const response = await tornApi.fetchBasic(apiKey, playerId)
			const { name } = response
			context.commit('setPlayerName', { player_id: playerId, name })
			context.commit('setLoading', false)
		},
		markAsPaid(context, attackOrGroup) {
			const { defender_id: playerId, timestamp_ended: timestamp } = attackOrGroup
			context.commit('setPaidUntil', { playerId, timestamp })
		},
		markAsUnpaid(context, attackOrGroup) {
			const { defender_id: playerId, timestamp_ended, timestamp_started } = attackOrGroup
			const timestamp = (timestamp_started || timestamp_ended) - 1
			context.commit('setPaidUntil', { playerId, timestamp })
		},
	},
})

store.subscribe((mutation, state) => {
	console.log('[Store] Mutation', mutation)
	if (['setHideClients', 'setLoading'].includes(mutation.type)) return
	const filteredState = Object.assign({}, state)
	delete filteredState.hideClients
	delete filteredState.loading
	console.log('[Store] Saving new state', filteredState)
	saveToStorage(filteredState)
})

export default store
