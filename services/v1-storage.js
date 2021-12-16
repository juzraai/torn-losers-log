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
	 * @return {{ apiKey: String, dark: Boolean, lastUpdate: Number, losses: { code: String, defender_id: Number, paid: Boolean, price: Number, timestamp_ended: Number }[], names: Object<Number, String>, paidUntil: Object<Number, Number>, playerId: Number, prices: Object<Number,{ timestamp: Number, price: Number }[]> }}
	 */
	load() {
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
