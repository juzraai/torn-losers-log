const LOCALE_STORAGE_KEY = 'TLLv2';

const PERSISTED_MODULES = [
	'log',
	'settings',
];

let saveTimeout = null;

function exportState(state) {
	const persistedState = {};
	for (const key of PERSISTED_MODULES) {
		persistedState[key] = JSON.parse(JSON.stringify(state[key]));
	}
	return persistedState;
}

export default ({ store }, inject) => {
	store.subscribe((mutation, state) => {
		if (PERSISTED_MODULES.includes(mutation.type.split('/')[0])) {
			if (saveTimeout) {
				clearTimeout(saveTimeout);
			}
			saveTimeout = setTimeout(() => {
				const persistedState = exportState(state);
				console.log('[TLL] Saving state', persistedState);
				window.localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(persistedState));
			}, 1000);
		}
	});

	inject('loadPreviousState', () => {
		const previousState = JSON.parse(window.localStorage.getItem(LOCALE_STORAGE_KEY) || '{}');
		console.log('[TLL] Loading state', previousState);
		const mergedState = Object.assign({}, store.state, previousState);
		store.commit('INIT', mergedState);
	});

	inject('exportState', () => exportState(store.state));

	inject('removeStorageEntry', () => window.localStorage.removeItem(LOCALE_STORAGE_KEY));
};
