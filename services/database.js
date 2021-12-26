import Dexie from 'dexie';
import TORN from './torn';
// eslint-disable-next-line no-unused-vars
import { TLLAttack } from '@/models/Attack';
// eslint-disable-next-line no-unused-vars
import Player from '@/models/Player';

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

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
	 * @returns {Promise<Number>}
	 */
	async countAllAttacks() {
		let sum = 0;
		for (const role of Object.values(ROLE)) {
			for (const result of Object.values(RESULT)) {
				sum += await this.countAttacks(role, result);
			}
		}
		return sum;
	},

	/**
	 * @param {String} role attacker|defender
	 * @param {String} result Lost|Escape
	 * @returns {Promise<Number>}
	 */
	countAttacks(role, result) {
		return this.table(role, result).count();
	},

	/**
	 * @returns {Promise}
	 */
	deleteDatabase() {
		db.delete();
	},

	/**
	 * @returns {Promise}
	 */
	async deleteRecords() {
		for (const role of Object.values(ROLE)) {
			for (const result of Object.values(RESULT)) {
				await this.table(role, result).clear();
			}
		}
	},

	/**
	 * @returns {Promise<Object<String, Player[]|TLLAttack[]>>}
	 */
	async dump() {
		const dump = {};
		dump.players = await db.players.toArray();
		for (const role of Object.values(ROLE)) {
			for (const result of Object.values(RESULT)) {
				dump[`${role}:${result}`] = await this.table(role, result).toArray();
			}
		}
		return dump;
	},

	/**
	 * @param {Object<String, Player[]|TLLAttack[]>}
	 * @returns {Promise}
	 */
	async loadDump(dump) {
		await this.addPlayers(dump.players || []);
		for (const role of Object.values(ROLE)) {
			for (const result of Object.values(RESULT)) {
				await this.addAttacks(role, result, dump[`${role}:${result}`] || []);
			}
		}
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
			.orderBy('timestamp').reverse().filter(a => !npcAttack(a));
		if (grouping === GROUPING.EVENT) {
			const attacks = await query
				.and(a => !a.paid || includePaid)
				.limit(limit)
				.toArray();
			r = attacks.map(a => [a]);
		} else if (grouping === GROUPING.SESSION) {
			const sessions = [];
			await query
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
				.and(a => !a.paid || includePaid)
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
		} else if (grouping === GROUPING.DAYS) {
			r = await Promise.all(this.pastDays(limit).map(dayMs => {
				const dayEndMs = dayMs + ONE_DAY_MS - 1;
				return this.table(role, result)
					.where('timestamp')
					.between(dayMs / 1000, dayEndMs / 1000, true, true)
					.toArray();
			}));
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
	 * @param {Number} n
	 * @returns {Number[]} UTC 00:00:00.000 timestamps (milliseconds) of the past N days including today.
	 */
	pastDays(n) {
		const todayMs = new Date().setUTCHours(0, 0, 0, 0); // 00:00:00.000 UTC
		const days = [];
		for (let i = 0; i < n; i++) {
			days.push(todayMs - i * ONE_DAY_MS);
		}
		return days;
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

	/**
	 * Grouping together attacks of the same UTC day. Returning an array entry for every UTC day within the interval.
	 */
	DAYS: 'days',
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
