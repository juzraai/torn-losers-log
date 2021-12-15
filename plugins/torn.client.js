export default ({ $axios, store }, inject) => {
	// const key = store.state.settings.apiKey || '';

	function f(url, key) {
		key = key || store.state.settings.apiKey;
		return $axios.$get(`${url}&key=${key}`);
	}

	inject('torn', { // TODO would be nice if below JSDoc would actually appear in other files
		/**
		 * @param {String} key
		 * @returns {{attacker_id: Number, attacker_name: String, code: String, defender_id: Number, defender_name: String, result: String, timestamp_ended: Number}[]}
		 */
		attacks: key => f('/user/?selections=attacks', key),

		/**
		 * @param {String} key
		 * @returns {{attacker_id: Number, code: String, defender_id: Number, result: String, timestamp_ended: Number}[]}
		 */
		attacksfull: key => f('/user/?selections=attacksfull', key),

		/**
		 * @param {String} key
		 * @param {Number} playerId
		 * @returns {{ name: String, player_id: Number }}
		 */
		basic: key => f('/user/?selections=basic', key),
	});
};
