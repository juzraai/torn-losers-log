/* eslint-disable camelcase */
import DB, { RESULT, ROLE } from './database';
import TORN from './torn';
import { TLLAttack } from '~/models/Attack';

let $store = null;

export default {
	init($storeInstance) {
		$store = $storeInstance;
		return this;
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
		attacksfull = attacksfull
			.filter(globalAttackFilter)
			.map(a => {
				a.result = a.result.replace('Timeout', 'Lost'); // Timeouts count as Losses
				return a;
			});

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
					await DB.addAttacks(role, result, attacks);
				}
			}
		}

		const attacks = await TORN.attacks(apiKey);
		const players = [];
		attacks.filter(globalAttackFilter).forEach(a => {
			for (const role of Object.values(ROLE)) {
				const id = a[`${role}_id`];
				const name = a[`${role}_name`];
				if (id && name) {
					players.push({ id, name });
				}
			}
		});
		await DB.addPlayers(players);

		console.timeEnd('[TLL] Updated attacks in');
	},
};
