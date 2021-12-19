// eslint-disable-next-line no-unused-vars
import { TornAttack, TornAttackWithNames } from '@/models/Attack';

let $axios = null;

/**
 * @param {String} apiKey
 * @param {String} request Route and querystring, starting with slash
 */
function tornApiCall(apiKey, request) {
	if (!$axios) {
		throw new Error('Call init($axios) first!');
	}
	if (!apiKey) {
		throw new Error('apiKey is required!');
	}
	return $axios.$get(`${request}&key=${apiKey}`); // base URL set in nuxt.config.js
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
		return Object.values(res.attacks);
	},

	/**
	 * @param {String} apiKey
	 * @returns {Promise<TornAttack[]>}
	 */
	async attacksfull(apiKey) {
		const res = await tornApiCall(apiKey, '/user/?selections=attacksfull');
		return Object.values(res.attacks);
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
	],
};
