import Dexie from 'dexie';
import TORN from './torn';
// eslint-disable-next-line no-unused-vars
import { TLLAttack } from '@/models/Attack';
// eslint-disable-next-line no-unused-vars
import Player from '@/models/Player';

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

	/**
	 * @param {TLLAttack[]} attacks
	 * @returns {Promise}
	 */
	addAttacks(attacks) {
		return db.attacks.bulkAdd(attacks);
	},

	/**
	 * @param {Player[]} players
	 * @returns {Promise}
	 */
	addPlayers(players) {
		return db.players.bulkPut(players);
	},

	/**
	 * @param {Number} attacker
	 * @param {Number} defender
	 * @param {String} result
	 * @param {Boolean} includePaid
	 * @returns {Function<TLLAttack, Boolean>}
	 */
	attackFilter(attacker, defender, result, includePaid) {
		return a =>
			!TORN.NPCs.includes(a.attacker_id) &&
			!TORN.NPCs.includes(a.defender_id) &&
			(a.attacker_id === attacker || !attacker) &&
			(a.defender_id === defender || !defender) &&
			a.result === result &&
			(!a.paid || includePaid);
	},

	/**
	 * @param {String} key
	 * @param {Number} attacker
	 * @param {Number} defender
	 * @param {String} result
	 * @param {Boolean} includePaid
	 * @param {Number} limit
	 * @returns {Dexie.Collection}
	 */
	attacksQuery(key, attacker, defender, result, includePaid, limit) {
		return db.attacks
			.orderBy(key)
			.reverse()
			.filter(this.attackFilter(attacker, defender, result, includePaid))
			.limit(limit);
	},

	/**
	 * @param {String} key
	 * @param {Number} attacker
	 * @param {Number} defender
	 * @param {String} result
	 * @param {Boolean} includePaid
	 * @param {Number} limit
	 * @returns {Promise<TLLAttack[]>}
	 */
	getAttacks(key, attacker, defender, result, includePaid, limit) {
		return this.attacksQuery(key, attacker, defender, result, includePaid, limit).toArray();
	},

	/**
	 * @param {String} keyPath
	 * @param {Number} key
	 * @returns {Promise<TLLAttack[]>}
	 */
	async getAttacksForKey(keyPath, key) {
		const attacks = await db.attacks.where(keyPath).equals(key).toArray();
		return attacks.sort((a, b) => b.timestamp_ended - a.timestamp_ended); // desc
	},

	/**
	 * @param {Number} id
	 * @returns {Promise<Player>}
	 */
	getPlayer(id) {
		return db.players.get(id);
	},

	/**
	 * @param {TLLAttack} a
	 * @param {TLLAttack} b
	 * @returns {Boolean}
	 */
	isSameSession(a, b) {
		return a.attacker_id === b.attacker_id &&
			a.defender_id === b.defender_id &&
			a.paid === b.paid &&
			a.price === b.price;
	},

	/**
	 * @param {TLLAttack[]} attacks
	 * @returns {Promise}
	 */
	async markPaidUntil(attacks) {
		const current = attacks[0];
		await db.attacks
			.where('timestamp_ended')
			.belowOrEqual(current.timestamp_ended)
			.filter(this.attackFilter(current.attacker_id, current.defender_id, current.result, false))
			.modify(a => {
				a.paid = true;
			});
		await this.updateSessions(current.attacker_id, current.defender_id, current.result, current.session);
	},

	/**
	 * @param {TLLAttack[]} attacks
	 * @returns {Promise}
	 */
	async markUnpaidFrom(attacks) {
		const current = attacks[0];
		await db.attacks
			.where('timestamp_ended')
			.aboveOrEqual(current.timestamp_ended)
			.filter(this.attackFilter(current.attacker_id, current.defender_id, current.result, true))
			.modify(a => {
				a.paid = false;
			});
		await this.updateSessions(current.attacker_id, current.defender_id, current.result, current.session);
	},

	/**
	 * @param {Number} attacker
	 * @param {Number} defender
	 * @param {String} result
	 * @param {Number} minTs
	 * @returns {Promise}
	 */
	async updateSessions(attacker, defender, result, minTs) {
		console.time('[TLL] Updated sessions in');
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
		console.timeEnd('[TLL] Updated sessions in');
	},

};
