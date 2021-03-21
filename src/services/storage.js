import LZString from 'lz-string'

const LOCAL_STORAGE_KEY = 'store'

class CompressedLocalStorage {

	load() {
		const lz = localStorage.getItem(LOCAL_STORAGE_KEY)
		if (lz) {
			const json = LZString.decompressFromUTF16(lz)
			return JSON.parse(json)
		}
		return false
	}

	save(object) {
		const json = JSON.stringify(object)
		const lz = LZString.compressToUTF16(json)
		localStorage.setItem(LOCAL_STORAGE_KEY, lz)
		const size = (this.size() / 1024).toFixed(2)
		console.log(`[Storage] JSON: ${json.length} -> lz: ${lz.length} (${Math.round(lz.length / json.length * 100)}%) | LocalStorage: ${size} KB`)
	}

	size() {
		// https://stackoverflow.com/a/15720835/2418224
		var _lsTotal = 0,
			_xLen, _x;
		for (_x in localStorage) {
			if (!localStorage.hasOwnProperty(_x)) {
				continue;
			}
			_xLen = ((localStorage[_x].length + _x.length) * 2);
			_lsTotal += _xLen;
			//console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
		};
		//console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
		return _lsTotal
	}

	clear() {
		localStorage.removeItem(LOCAL_STORAGE_KEY)
	}
}

export default new CompressedLocalStorage()
