export default class Player {
	/**
	 * @param {Object} data
	 * @param {Number} data.id
	 * @param {String} data.name
	 */
	constructor(data) {
		this.id = data.id;
		this.name = data.name;
	}

	/**
	 * @param {Number} id
	 * @param {String} name
	 * @returns {Player}
	 */
	static create(id, name) {
		return new Player({ id, name });
	}
};
