let $axios = null;

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
	 * @returns {{attacker_id: Number, attacker_name: String, code: String, defender_id: Number, defender_name: String, result: String, timestamp_ended: Number}[]}
	 */
	async attacks(apiKey) {
		const res = await tornApiCall(apiKey, '/user/?selections=attacks');
		return Object.values(res.attacks);
	},

	/**
	 * @param {String} apiKey
	 * @returns {{attacker_id: Number, code: String, defender_id: Number, result: String, timestamp_ended: Number}[]}
	 */
	async attacksfull(apiKey) {
		const res = await tornApiCall(apiKey, '/user/?selections=attacksfull');
		return Object.values(res.attacks);
	},

	/**
	 * @param {String} apiKey
	 * @param {Number} playerId
	 * @returns {{ level: Number, name: String, player_id: Number }}
	 */
	basic(apiKey, playerId) {
		return tornApiCall(apiKey, `/user/${playerId || ''}?selections=basic`);
	},
};
