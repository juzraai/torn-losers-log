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
		const attackSchema = 'code,opponentId,paid,timestamp';
		db.version(1).stores({
			players: 'id',
			incomingEscapes: attackSchema,
			incomingLosses: attackSchema,
			outgoingEscapes: attackSchema,
			outgoingLosses: attackSchema,
		});
		// Syntax: 'PK,key,key,...'
		// Docs: https://dexie.org/docs/Version/Version.stores()

		window.DB = this;
	},

	/**
	 * @param {String} role attacker|defender
	 * @param {String} result Lost|Escape
	 * @returns {Dexie.Table}
	 */
	table(role, result) {
		const roles = {
			attacker: 'outgoing',
			defender: 'incoming',
		};
		const results = {
			Lost: 'Losses',
			Escape: 'Escapes',
		};
		const t = `${roles[role]}${results[result]}`;
		return db[t];
	},

	/**
	 * @param {Player[]} players
	 * @returns {Promise}
	 */
	addPlayers(players) {
		return db.players.bulkPut(players);
	},

	/**
		 * @param {Number} id
		 * @returns {Promise<Player>}
		 */
	getPlayer(id) {
		return db.players.get(id);
	},

	/**
	 * @param {TLLAttack[]} attacks
	 * @returns {Promise}
	 */
	addAttacks(role, result, attacks) {
		return this.table(role, result).bulkAdd(attacks.filter(a => !TORN.NPCs.includes(a.opponentId))); // don't even store those NPC attacks
	},

	/**
	 * @param {TLLAttack} a
	 * @param {TLLAttack} b
	 * @returns {Boolean}
	 */
	isSameGroup(a, b) {
		return a.opponentId === b.opponentId &&
			a.paid === b.paid &&
			a.price === b.price;
	},

	/**
	 * @param {String} role attacker|defender
	 * @param {String} result Lost|Escape
	 * @param {Boolean} includePaid
	 * @param {String} grouping event|session
	 * @param {Number} limit
	 * @returns {TLLAttack[][]}
	 */
	async queryAttacks(role, result, includePaid, grouping, limit) {
		console.time(`[TLL] Attack query (${grouping}) completed in`);
		let r;
		const query = this.table(role, result)
			.orderBy('timestamp').reverse();
		if (grouping === 'event') {
			const attacks = await query
				.filter(a => !a.paid || includePaid)
				.limit(limit)
				.toArray();
			r = attacks.map(a => [a]);
		} else if (grouping === 'session') {
			const sessions = [];
			const sessionFilter = s => !s[0].paid || includePaid;
			await query
				.until(() => sessions.filter(sessionFilter).length > limit)
				.each(a => {
					!sessions.length && sessions.push([]);
					const s = sessions[sessions.length - 1];
					const p = s[s.length - 1] || a;
					if (this.isSameGroup(a, p)) {
						s.push(a);
					} else {
						sessions.push([a]);
					}
				});
			r = sessions.filter(sessionFilter).slice(0, limit);
		}
		console.timeEnd(`[TLL] Attack query (${grouping}) completed in`);
		return r;
	},

	/**
	 * @param {String} role attacker|defender
	 * @param {String} result Lost|Escape
	 * @param {Boolean} includePaid
	 * @param {String} grouping event|session
	 * @param {Number} limit
	 * @returns {TLLAttack[][]}
	 */

	/**
	 * @param {String} role attacker|defender
	 * @param {String} result Lost|Escape
	 * @param {TLLAttack[]} attacks
	 * @returns {Promise}
	 */
	markPaidUntil(role, result, attacks) {
		const current = attacks[0];
		return this.table(role, result)
			.where('opponentId').equals(current.opponentId)
			.filter(a => a.timestamp <= current.timestamp && !a.paid)
			.modify(a => {
				a.paid = 1;
			});
	},

	/**
	 * @param {String} role attacker|defender
	 * @param {String} result Lost|Escape
	 * @param {TLLAttack[]} attacks
	 * @returns {Promise}
	 */
	markUnpaidFrom(role, result, attacks) {
		const current = attacks.length === 1 ? attacks[0] : attacks[attacks.length - 1];
		return this.table(role, result)
			.where('opponentId').equals(current.opponentId)
			.filter(a => a.timestamp >= current.timestamp && a.paid)
			.modify(a => {
				a.paid = 0;
			});
	},

	/**
	 * @param {String} role attacker|defender
	 * @param {String} result Lost|Escape
	 * @param {String} result
	 * @returns {Promise<Number>}
	 */
	async sumOfUnpaid(role, result) {
		let sum = 0;
		console.time('[TLL] Summed unpaids in');
		await this.table(role, result)
			.where('paid').equals(0)
			.each(a => {
				sum += a.price;
			});
		console.timeEnd('[TLL] Summed unpaids in');
		return sum;
	},

};
