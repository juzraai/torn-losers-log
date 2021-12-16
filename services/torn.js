export default {

	$axios: null,
	init($axiosInstance) {
		this.$axios = $axiosInstance;
		return this;
	},

	fetch(apiKey, request) {
		if (!this.$axios) {
			throw new Error('Call init($axios) first!');
		}
		if (!apiKey) {
			throw new Error('apiKey is required!');
		}
		return this.$axios.$get(`${request}&key=${apiKey}`); // base URL set in nuxt.config.js
	},

	/**
	 * @param {String} apiKey
	 * @returns {{attacker_id: Number, attacker_name: String, code: String, defender_id: Number, defender_name: String, result: String, timestamp_ended: Number}[]}
	 */
	async attacks(apiKey) {
		const res = await this.fetch(apiKey, '/user/?selections=attacks');
		return Object.values(res.attacks);
	},

	/**
	 * @param {String} apiKey
	 * @returns {{attacker_id: Number, code: String, defender_id: Number, result: String, timestamp_ended: Number}[]}
	 */
	async attacksfull(apiKey) {
		const res = await this.fetch(apiKey, '/user/?selections=attacksfull');
		return Object.values(res.attacks);
	},

	/**
	 * @param {String} apiKey
	 * @param {Number} playerId
	 * @returns {{ level: Number, name: String, player_id: Number }}
	 */
	basic(apiKey, playerId) {
		return this.fetch(apiKey, `/user/${playerId || ''}?selections=basic`);
	},
};
