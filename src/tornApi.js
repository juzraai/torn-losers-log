class TornApi {

	/**
	 * @param {String} apiKey
	 * @returns {{}}
	 */
	async fetchAttacks(apiKey) {
		if (!apiKey) return
		console.log('[TORN API Client] Fetching attacks')
		const res = await fetch(`https://api.torn.com/user/?selections=attacksfull&key=${apiKey}`)
		const obj = await res.json()
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
		const res = await fetch(`https://api.torn.com/user/${playerId ? playerId : ''}?selections=basic&key=${apiKey}`)
		return res.json()
	}
}

export default new TornApi
