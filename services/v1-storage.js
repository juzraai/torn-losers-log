/*
	This is the storage module of TLLv1.
	Keeping this for the sake of backwards-compatibility,
	newer versions will auto-migrate old data.
*/

import LZString from 'lz-string';
// eslint-disable-next-line no-unused-vars
import V1Store from '../models/V1Store';

const LOCAL_STORAGE_KEY = 'store';

export default {
	clear() {
		localStorage.removeItem(LOCAL_STORAGE_KEY);
	},

	/**
	 * @returns {V1Store}
	 */
	load() {
		const json = this.loadRaw();
		if (json) {
			return JSON.parse(json);
		}
		return false;
	},

	/**
	 * @returns {String}
	 */
	loadRaw() {
		const lz = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (lz) {
			return LZString.decompressFromUTF16(lz);
		}
		return false;
	},

	/**
	 * @param {V1Store} store
	 */
	save(store) {
		const json = JSON.stringify(store);
		const lz = LZString.compressToUTF16(json);
		localStorage.setItem(LOCAL_STORAGE_KEY, lz);
	},
};
