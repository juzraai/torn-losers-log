/* eslint-disable camelcase */

export default class V1Store {
	/** @type {String} */
	apiKey;

	/** @type {Boolean} */
	dark;

	/** @type {Number} */
	lastUpdate;

	/** @type {V1Loss[]} */
	losses;

	/** @type {Object<Number, String>} */
	names;

	/** @type {Object<Number, Number>} */
	paidUntil;

	/** @type {Number} */
	playerId;

	/** @type {Object<Number, { timestamp: Number, price: Number }[]>} */
	prices;
};

// eslint-disable-next-line no-unused-vars
class V1Loss {
	/** @type {String} */
	code;

	/** @type {Number} */
	defender_id;

	/** @type {Boolean,} */
	paid;

	/** @type {Number} */
	price;

	/** @type {Number} */
	timestamp_ended;
};
