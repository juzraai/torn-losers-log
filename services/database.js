import Dexie from 'dexie';
import TORN from './torn';

let db = null;

export default {
	init() {
		db = new Dexie('TLL');
		// TODO add new db versions here, keep the old ones!
		db.version(1).stores({
			attacks: 'code,attacker_id,defender_id,paid,result,session,timestamp_ended',
			players: 'id',
		});
		// Syntax: 'PK,key,key,...'
		// Docs: https://dexie.org/docs/Version/Version.stores()
	},

	addAttacks(attacks) {
		return db.attacks.bulkAdd(attacks);
	},

	/**
	 * @param {{ id: Number, name: String }[]} players
	 */
	addPlayers(players) {
		return db.players.bulkPut(players);
	},

	attackFilter(attacker, defender, result, includePaid) {
		return a =>
			!TORN.NPCs.includes(a.attacker_id) &&
			!TORN.NPCs.includes(a.defender_id) &&
			(a.attacker_id === attacker || !attacker) &&
			(a.defender_id === defender || !defender) &&
			a.result === result &&
			(!a.paid || includePaid);
	},

	attacksQuery(key, attacker, defender, result, includePaid, limit) {
		return db.attacks
			.orderBy(key)
			.reverse()
			.filter(this.attackFilter(attacker, defender, result, includePaid))
			.limit(limit);
	},

	getAttacks(key, attacker, defender, result, includePaid, limit) {
		return this.attacksQuery(key, attacker, defender, result, includePaid, limit).toArray();
	},

	async getAttacksForKey(keyPath, key) {
		const attacks = await db.attacks.where(keyPath).equals(key).toArray();
		return attacks.sort((a, b) => b.timestamp_ended - a.timestamp_ended); // desc
	},

	/**
	 * @param {Number} id
	 * @returns {{ id: Number, name: String }}
	 */
	getPlayer(id) {
		return db.players.get(id);
	},

	isSameSession(a, b) {
		return a.attacker_id === b.attacker_id &&
			a.defender_id === b.defender_id &&
			a.paid === b.paid &&
			a.price === b.price;
	},

	async updateSessions(attacker, defender, result, minTs) {
		if (!minTs) {
			// oldest attack where session=0
			const first = await db.attacks
				.orderBy('timestamp_ended')
				.filter(a => this.attackFilter(attacker, defender, result, true) && !a.session)
				.limit(1)
				.first();
			minTs = first ? first.timestamp_ended : 0;
		}

		// newest attack before minTs, used as first prev
		let last = await db.attacks
			.orderBy('timestamp_ended')
			.reverse()
			.filter(a => this.attackFilter(attacker, defender, result, true) && a.timestamp_ended < minTs)
			.limit(1)
			.first();
		await db.attacks
			.orderBy('timestamp_ended')
			.filter(a => this.attackFilter(attacker, defender, result, true) && a.timestamp_ended >= minTs)
			.modify(a => {
				const prev = last || a;
				a.session = this.isSameSession(a, prev) ? prev.session : a.timestamp_ended;
				last = a;
			});
	},

};
