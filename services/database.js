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

	/**
	 * @param {Number} id
	 * @returns {{ id: Number, name: String }}
	 */
	getPlayer(id) {
		return db.players.get(id);
	},

	query(key, attacker, defender, result, includePaid, limit) {
		return db.attacks
			.orderBy(key)
			.reverse()
			.filter(a =>
				!TORN.NPCs.includes(a.attacker_id) &&
				!TORN.NPCs.includes(a.defender_id) &&
				(!attacker || a.attacker_id === attacker) &&
				(!defender || a.defender_id === defender) &&
				a.result === result &&
				(!a.paid || includePaid)
			)
			.limit(limit)
			.toArray();
	},
};
