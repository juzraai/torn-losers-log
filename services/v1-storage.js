/*
	This is the storage module of TLLv1.
	Keeping this for the sake of backwards-compatibility,
	newer versions will auto-migrate old data.
*/

import LZString from 'lz-string';

const LOCAL_STORAGE_KEY = 'store';

export default {
	clear() {
		localStorage.removeItem(LOCAL_STORAGE_KEY);
	},

	/**
	 * @return {{ apiKey: String, lastUpdate: Number, losses: {}[], names: Object<Number, String> }}
	 */
	load() { // TODO add returned schema to JSDoc (paidUntil, playerId, prices)
		const json = this.loadRaw();
		if (json) {
			return JSON.parse(json);
		}
		return false;
	},

	loadRaw() {
		const lz = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (lz) {
			return LZString.decompressFromUTF16(lz);
		}
		return false;
	},

	save(object) {
		const json = JSON.stringify(object);
		const lz = LZString.compressToUTF16(json);
		localStorage.setItem(LOCAL_STORAGE_KEY, lz);
	},
};
