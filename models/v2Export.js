// eslint-disable-next-line no-unused-vars
import { TLLAttack } from './Attack';
// eslint-disable-next-line no-unused-vars
import Player from './Player';

export default class V2Export {
	/** @type {log: Object, settings: Object} */
	store;

	/** @type {Object<String, Player[]|TLLAttack[]>} */
	database;
};
