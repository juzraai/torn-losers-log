import moment from "moment"
import Vue from 'vue'
import Vuex from 'vuex'
import npcList from '../services/npcList'
import { tick } from '../services/perf'
import storage from '../services/storage'
import tornApi from '../services/tornApi'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		apiKey: null, // TORN API key
		dark: false, // dark mode
		forumAlertDismissed: false,
		lastUpdate: null, // Timestamp (Number) of last fetchLosses call
		losses: [], // TORN attacks filtered to losses and necessary fields
		names: {}, // TORN player ID -> name dictionary
		notifiedVersion: null, // last TLL version where alert dismissed
		paidUntil: {}, // TORN player ID -> timestamp
		playerId: null, // TORN player ID (which the API key belongs to)
		prices: {}, // TORN player ID -> [{ start timestamp, price}] ordered by timestamp ASC
		tab: 0, // selected tab index in LogWidget

		// not persisted:
		hideClients: false,
		loading: false,
	},
	mutations: {
		init(state, newState) {
			newState = newState || storage.load()
			if (newState) {
				if (state.apiKey) delete newState.apiKey
				delete newState.hideClients
				delete newState.loading
				newState = Object.assign(state, newState)
				this.replaceState(newState)
			}
		},
		setApiKey(state, apiKey) {
			state.apiKey = apiKey
		},
		setForumAlertDismissed(state, dismissed) {
			state.forumAlertDismissed = dismissed
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
		addLosses(state, newLosses) {
			// we need to update past losses too, because of Timeout result fix:
			const newIds = newLosses.map(a => a.timestamp_ended)
			const oldLosses = state.losses.filter(a => !newIds.includes(a.timestamp_ended))
			const losses = newLosses.concat(oldLosses)
			state.losses = losses.sort((a, b) => b.timestamp_ended - a.timestamp_ended).slice(0, 5000)
		},
		setNotifiedVersion(state, version) {
			state.notifiedVersion = version
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
		setPrice(state, payload) {
			const { player_id, timestamp, price } = payload
			const prices = (state.prices[player_id] || [])
				.filter(p => p.timestamp < timestamp) // dropping newer entries due to "from now on" concept
			prices.push({ timestamp, price })
			prices.sort((a, b) => a.timestamp - b.timestamp)
			Vue.set(state.prices, player_id, prices)
		},
		setTab(state, tab) {
			state.tab = tab
		},
		toggleDark(state) {
			state.dark = !state.dark
		},
	},
	getters: {
		losses(state) {
			const t = tick('getters.losses')
			const r = state.losses.map(a => {
				a.paid = state.paidUntil[a.defender_id] >= a.timestamp_ended

				const p = (state.prices[a.defender_id] || []).filter(p => p.timestamp <= a.timestamp_ended).reverse()[0]
				a.price = p ? p.price : 0

				return a
			}).filter(a => !npcList.includes(a.defender_id))
			r[r.length - 1].oldest = true
			t.tock()
			return r
		},
		days(_, getters) {
			return getters.losses.reduce((days, a) => {
				const day = dayOfAttack(a)
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
		dailyClients(_, getters) {
			return getters.losses.reduce((groups, a) => {
				const day = dayOfAttack(a)
				const pred = groupPredicate(a)
				const i = groups.findIndex(g => dayOfAttack(g) == day && pred(g))
				if (i > -1) {
					groups[i] = updateGroup(groups[i], a)
				} else {
					groups.push(newGroup(a))
				}
				return groups
			}, [])
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
		unpaidTotal(_, getters) {
			return getters.unpaidClients.map(g => g.attacks.length * g.price).reduce((sum, v) => sum += v, 0)
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
			storage.clear()
			window.location.reload()
		},
		exportData() {
			const json = storage.loadRaw()
			const blob = new Blob([json], { type: 'text/plain' })
			const file = window.URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.setAttribute('href', file)
			const ts = moment().format('YYMMDD-HHmmss')
			a.setAttribute('download', `tll-export-${ts}.json`)
			a.click()
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
			const response = await tornApi.fetchAttacksfull(apiKey)
			const losses = response.filter(a =>
				a.attacker_id === playerId &&
				['Lost', 'Timeout'].includes(a.result)
			).map(({ code, defender_id, timestamp_ended }) => ({
				code, defender_id, timestamp_ended
			}))
			losses.reverse()
			context.commit('addLosses', losses)
			// TODO auto-clean paidUntil dict:
			// 1) map losses to defID array
			// 2) filter paidUntil keys to those not included
			// 3) delete these keys from paidUntil

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
		async resolveNames(context) {
			context.commit('setLoading', true)
			const { apiKey } = context.state
			const attacks = await tornApi.fetchAttacks(apiKey)
			if (attacks.length) {
				const dict = {}
				attacks.forEach(a => {
					dict[a.attacker_id] = a.attacker_name
					dict[a.defender_id] = a.defender_name
				})
				Object.entries(dict).forEach(([player_id, name]) => {
					context.commit('setPlayerName', { player_id, name })
				})
			}
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
		setPrice(context, { entry, price }) {
			const { attacks, defender_id: player_id, timestamp_ended, timestamp_started } = entry
			const timestamp = attacks && attacks.length ? timestamp_started : timestamp_ended
			context.commit('setPrice', { player_id, price, timestamp })
		}
	},
})

let saveTimeout = null
store.subscribe((mutation, state) => {
	//console.log('[Store] Mutation', mutation)
	if (['setHideClients', 'setLoading'].includes(mutation.type)) return
	const filteredState = Object.assign({}, state)
	delete filteredState.hideClients
	delete filteredState.loading
	//console.log('[Store] Saving new state', filteredState)
	if (saveTimeout) clearTimeout(saveTimeout)
	saveTimeout = setTimeout(() => { storage.save(filteredState) }, 1000)
})

function dayOfAttack(a) {
	return new Date(a.timestamp_ended * 1000).toISOString().split('T')[0]
}

function groupPredicate(a) {
	return group => group.defender_id === a.defender_id
		&& group.paid === a.paid
		&& group.price === a.price
}

function newGroup(a) {
	const { defender_id, paid, price, timestamp_ended } = a
	return {
		attacks: [a],
		defender_id,
		paid,
		price,
		timestamp_ended,
		timestamp_started: a.timestamp_ended, // sic! we are using the "ended" timestamp of attacks!
	}
}

function updateGroup(group, a) {
	group.attacks.push(a)
	group.oldest |= a.oldest
	group.price = a.price
	group.timestamp_ended = Math.max(group.timestamp_ended, a.timestamp_ended)
	group.timestamp_started = Math.min(group.timestamp_started, a.timestamp_ended)
	return group
}

export default store
