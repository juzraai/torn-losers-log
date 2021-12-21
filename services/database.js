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
	 * @returns {Promise<Object<Number, Number>[]>}
	 */
	async getLastPricesPerOpponent(role, result) {
		const r = {};
		const ids = [];
		console.time('[TLL] Last prices/opponent queried in');
		await this.table(role, result)
			.orderBy('opponentId').uniqueKeys(opponentIds => {
				ids.push(...opponentIds);
			});
		await Promise.all(ids.map(async id => {
			const attacks = await this.table(role, result)
				.where('opponentId').equals(id)
				.sortBy('timestamp');
			r[id] = attacks.length ? attacks[attacks.length - 1].price : 0;
		}));
		console.timeEnd('[TLL] Last prices/opponent queried in');
		return r;
	},

	/**
	 * @param {String} role attacker|defender
	 * @param {String} result Lost|Escape
	 * @returns {Promise<TLLAttack>}
	 */
	getMostRecentAttack(role, result) {
		return this.table(role, result).orderBy('timestamp').reverse().first();
	},

	/**
	 * @param {String} role attacker|defender
	 * @param {String} result Lost|Escape
	 * @param {Boolean} includePaid
	 * @param {String} grouping event|session|contract
	 * @param {Number} limit
	 * @returns {Promise<TLLAttack[][]>}
	 */
	async queryAttacks(role, result, includePaid, grouping, limit) {
		let r = [];

		// NPCs are excluded when importing, but new NPCs can be
		// added in the future, hence we filter here too
		const npcAttack = a => TORN.NPCs.includes(a.opponentId);

		console.time(`[TLL] Attack query (${grouping}) completed in`);
		const query = this.table(role, result)
			.orderBy('timestamp').reverse();
		if (grouping === GROUPING.EVENT) {
			const attacks = await query
				.filter(a => (!a.paid || includePaid) && !npcAttack(a))
				.limit(limit)
				.toArray();
			r = attacks.map(a => [a]);
		} else if (grouping === GROUPING.SESSION) {
			const sessions = [];
			await query
				.filter(a => !npcAttack(a))
				.until(() => sessions.length > limit)
				.each(a => {
					const s = sessions.length ? sessions[sessions.length - 1] : [];
					const p = s[s.length - 1];
					if (p && this.isSameGroup(a, p)) {
						s.push(a);
					} else if (!a.paid || includePaid) {
						sessions.push([a]);
					}
				});
			r = sessions.slice(0, limit);
		} else if (grouping === GROUPING.CONTRACT) {
			const contracts = [];
			await query
				.filter(a => (!a.paid || includePaid) && !npcAttack(a))
				.until(() => contracts.length > limit)
				.each(a => {
					const i = contracts.findIndex(c => c[0] && this.isSameGroup(a, c[0]));
					if (i > -1) {
						contracts[i].push(a);
					} else {
						contracts.push([a]);
					}
				});
			r = contracts.slice(0, limit);
		}
		console.timeEnd(`[TLL] Attack query (${grouping}) completed in`);
		return r;
	},

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
	 * @param {TLLAttack[]} attacks
	 * @param {Number} price
	 * @returns {Promise}
	 */
	setPriceFrom(role, result, attacks, price) {
		const current = attacks[attacks.length - 1];
		return this.table(role, result)
			.where('opponentId').equals(current.opponentId)
			.filter(a => a.timestamp >= current.timestamp && a.price !== price)
			.modify(a => {
				a.price = price;
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

export const GROUPING = {
	/**
	 * Listing attacks individually in 1-element groups.
	 */
	EVENT: 'event',

	/**
	 * Grouping together consecutive attacks with same opponent, price and paid status.
	 */
	SESSION: 'session',

	/**
	 * Grouping together attacks with same opponent, price and paid status, regardless of their timestamp.
	 */
	CONTRACT: 'contract',
};

export const RESULT = {
	ESCAPE: 'Escape',
	LOST: 'Lost',
	// don't change the values here, these
	// are values returned by TORN API
};

export const ROLE = {
	ATTACKER: 'attacker',
	DEFENDER: 'defender',
	// don't change the values here, they are
	// used to build TORN attack field names :)
};
