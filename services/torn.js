// eslint-disable-next-line no-unused-vars
import { TornAttack, TornAttackWithNames } from '../models/Attack';

let $axios = null;

/**
 * @param {String} apiKey
 * @param {String} request Route and querystring, starting with slash
 */
async function tornApiCall(apiKey, request) {
	if (!$axios) {
		throw new Error('Call init($axios) first!');
	}
	if (!apiKey) {
		throw new Error('apiKey is required!');
	}

	const now = new Date();
	const mm = String(now.getMonth() + 1).padStart(2, '0');
	const dd = String(now.getDate()).padStart(2, '0');
	const hh = String(now.getHours()).padStart(2, '0');
	const min = String(now.getMinutes()).padStart(2, '0');
	const comment = `TLL-${hh}${min}-${mm}${dd}`;

	const res = await $axios.$get(`${request}&key=${apiKey}&comment=${encodeURIComponent(comment)}`); // base URL set in nuxt.config.js
	if (res.error) {
		console.error('[TLL] TORN API error:', JSON.stringify(res.error));
	}
	return res;
}

export default {
	init($axiosInstance) {
		$axios = $axiosInstance;
		return this;
	},

	/**
	 * @param {String} apiKey
	 * @returns {Promise<TornAttackWithNames[]>}
	 */
	async attacks(apiKey) {
		const res = await tornApiCall(apiKey, '/user/?selections=attacks');
		return res.attacks ? Object.values(res.attacks) : [];
	},

	/**
	 * @param {String} apiKey
	 * @returns {Promise<TornAttack[]>}
	 */
	async attacksfull(apiKey) {
		const res = await tornApiCall(apiKey, '/user/?selections=attacksfull');
		return res.attacks ? Object.values(res.attacks) : [];
	},

	/**
	 * @param {String} apiKey
	 * @param {Number} playerId
	 * @returns {Promise<{ level: Number, name: String, player_id: Number }>}
	 */
	basic(apiKey, playerId) {
		return tornApiCall(apiKey, `/user/${playerId || ''}?selections=basic`);
	},

	NPCs: [
		4, // Duke
		7, // Amanda
		10, // Scrooge
		15, // Leslie
		17, // Easter Bunny
		19, // Jimmy
		20, // Fernando
		21, // Tiny
		// https://wiki.torn.com/wiki/Loot#Lootable_NPCs
	],
};
