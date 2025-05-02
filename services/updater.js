/* eslint-disable camelcase */
import { TLLAttack } from '../models/Attack';
import DB, { RESULT, ROLE } from './database';
import TORN from './torn';

let $store = null;

export default {
	init($storeInstance) {
		$store = $storeInstance;
		return this;
	},
	schedule() {
		if (window.tllUpdateTimeout) {
			console.log('[TLL] Scheduled update cancelled');
		}
		clearTimeout(window.tllUpdateTimeout);
		const interval = $store.state.settings.updateIntervalMs;
		if (interval) {
			console.log('[TLL] Scheduled update in ', interval);
			window.tllUpdateTimeout = setTimeout(async () => {
				$store.commit('ui/SET_LOADING', true);
				await this.updateAttacks();
				$store.commit('ui/SET_LOADING', false);
				this.schedule(); // reschedule
			}, interval);
		}
	},
	async updateAttacks() {
		console.time('[TLL] Updated attacks in');
		const apiKey = $store.state.settings.apiKey;
		const playerId = $store.state.settings.playerId;

		const globalAttackFilter = a =>
			!TORN.NPCs.includes(a.attacker_id) &&
			!TORN.NPCs.includes(a.defender_id) &&
			['Lost', 'Timeout', 'Escape'].includes(a.result);

		let attacksfull = await TORN.attacksfull(apiKey);
		const attacksfullLength = attacksfull.length;
		attacksfull = attacksfull
			.filter(globalAttackFilter)
			.map(a => {
				a.result = a.result.replace('Timeout', 'Lost'); // Timeouts count as Losses
				return a;
			});
		console.log('[TLL] [DEBUG] attacksfull:', attacksfullLength, 'filtered:', attacksfull.length);

		for (const role of Object.values(ROLE)) {
			for (const result of Object.values(RESULT)) {
				const last = await DB.getMostRecentAttack(role, result);
				const lastPrices = await DB.getLastPricesPerOpponent(role, result);
				const minTs = last?.timestamp || 0;
				const attacks = attacksfull
					.filter(a =>
						a[`${role}_id`] === playerId &&
						a.result === result &&
						a.timestamp_ended > minTs
					)
					.map(({ attacker_id, code, defender_id, timestamp_ended }) => {
						const opponentId = role === ROLE.ATTACKER ? defender_id : attacker_id;
						return new TLLAttack({
							code,
							opponentId,
							paid: 0,
							price: lastPrices[opponentId] || 0,
							timestamp: timestamp_ended,
						});
					});
				if (attacks.length) {
					console.log('[TLL] [DEBUG] adding', attacks.length, 'attacks, role:', role, 'result:', result);
					await DB.addAttacks(role, result, attacks);
				}
			}
		}

		let attacks = await TORN.attacks(apiKey);
		const attacksLength = attacks.length;
		attacks = attacks.filter(globalAttackFilter);
		console.log('[TLL] [DEBUG] attacks:', attacksLength, 'filtered:', attacks.length);
		const players = [];
		attacks.forEach(a => {
			for (const role of Object.values(ROLE)) {
				const id = a[`${role}_id`];
				const name = a[`${role}_name`];
				if (id && name && players.findIndex(p => p.id === id) === -1) {
					players.push({ id, name });
				}
			}
		});
		if (players.length) {
			console.log('[TLL] [DEBUG] adding', players.length, 'players');
			await DB.addPlayers(players);
		}

		$store.commit('log/SET_LAST_UPDATED', new Date().getTime());

		console.timeEnd('[TLL] Updated attacks in');

		return attacksfullLength; // for error handling on UI
	},
};
