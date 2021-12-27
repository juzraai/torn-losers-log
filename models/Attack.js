export class TornAttack {
	/**
	 * @param {Object} data
	 * @param {Number} data.attacker_id
	 * @param {String} data.code Attack ID
	 * @param {Number} data.defender_id
	 * @param {String} data.result
	 * @param {Number} data.timestamp_ended
	 */
	constructor(data) {
		this.attacker_id = data.attacker_id;
		this.code = data.code;
		this.defender_id = data.defender_id;
		this.result = data.result;
		this.timestamp_ended = data.timestamp_ended;
		// API returns more fields, this is the subset that TLL uses
	}
};

export class TornAttackWithNames extends TornAttack {
	/**
		 * @param {Object} data
		 * @param {Number} data.attacker_id
		 * @param {String} data.attacker_name
		 * @param {String} data.code Attack ID
		 * @param {Number} data.defender_id
		 * @param {String} data.defender_name
		 * @param {String} data.result
		 * @param {Number} data.timestamp_ended
		 */
	constructor(data) {
		super(data);
		this.attacker_name = data.attacker_name;
		this.defender_name = data.defender_name;
	}
};

export class TLLAttack {
	/**
	 * @param {Object} data
	 * @param {String} data.code Attack ID
	 * @param {Number} data.opponentId
	 * @param {Number} data.paid 0=unpaid, 1=paid
	 * @param {Number} data.price
	 * @param {Number} data.timestamp
	 */
	constructor(data) {
		this.code = data.code;
		this.opponentId = data.opponentId;
		this.paid = data.paid ? 1 : 0;
		this.price = data.price || 0;
		this.timestamp = data.timestamp;
	}
};
