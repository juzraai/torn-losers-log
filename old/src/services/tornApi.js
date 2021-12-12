class TornApi {

	async _fetch(apiKey, selection) {
		const res = await fetch(`https://api.torn.com/user/?selections=${selection}&key=${apiKey}`)
		return res.json()
	}

	/**
	 * @param {String} apiKey
	 * @returns {{attacker_id: Number, attacker_name: String, code: String, defender_id: Number, defender_name: String, result: String, timestamp_ended: Number}[]}
	 */
	async fetchAttacks(apiKey) {
		if (!apiKey) return
		console.log('[TORN API Client] Fetching attacks')
		const obj = await this._fetch(apiKey, 'attacks')
		return Object.values(obj.attacks)
	}

	/**
	 * @param {String} apiKey
	 * @returns {{attacker_id: Number, code: String, defender_id: Number, result: String, timestamp_ended: Number}[]}
	 */
	async fetchAttacksfull(apiKey) {
		if (!apiKey) return
		console.log('[TORN API Client] Fetching attacks (full)')
		const obj = await this._fetch(apiKey, 'attacksfull')
		return Object.values(obj.attacks)
	}

	/**
	 * @param {String} apiKey
	 * @param {Number} playerId
	 * @returns {{ level: Number, name: String, player_id: Number }}
	 */
	async fetchBasic(apiKey, playerId) {
		if (!apiKey) return
		console.log('[TORN API Client] Fetching basic info', playerId)
		const res = await fetch(`https://api.torn.com/user/${playerId ? playerId : ''}?selections=basic&key=${apiKey}`) // TODO use _fetch
		return res.json()
	}
}

export default new TornApi
