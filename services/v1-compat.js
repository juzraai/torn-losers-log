/* eslint-disable camelcase */
import { ROLE, RESULT } from './database';
import { TLLAttack } from '@/models/Attack';
// eslint-disable-next-line no-unused-vars
import V1Store from '@/models/V1Store';
// eslint-disable-next-line no-unused-vars
import V2Export from '@/models/V2Export';

export default {

	/**
	 * @param {V1Store} v1Store
	 * @returns {V2Export} V2 export
	 */
	convert(v1Store) {
		const {
			apiKey,
			dark,
			lastUpdate,
			losses,
			names,
			playerId
		} = v1Store;

		const log = {
			lastUpdated: lastUpdate,
		};
		const settings = {
			apiKey,
			darkMode: dark,
			playerId,
		};

		const players = [];
		Object.entries(names).forEach(([playerId, name]) => {
			const id = Number('0' + playerId);
			if (id) {
				players.push({ id, name });
			}
		});

		for (let i = 0; i < losses.length; i++) {
			const {
				code,
				defender_id,
				paid,
				price,
				timestamp_ended,
			} = losses[i];

			losses[i] = new TLLAttack({
				code,
				opponentId: defender_id,
				paid,
				price,
				timestamp: timestamp_ended,
			});
		}

		const database = {
			players,
		};
		database[`${ROLE.ATTACKER}:${RESULT.LOST}`] = losses;

		return {
			store: {
				log,
				settings
			},
			database,
		};
	},
};
