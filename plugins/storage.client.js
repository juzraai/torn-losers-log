const LOCALE_STORAGE_KEY = 'TLLv2';

const PERSISTED_MODULES = [
	'settings'
];

export default ({ store }, inject) => {
	store.subscribe((mutation, state) => {
		if (PERSISTED_MODULES.includes(mutation.type.split('/')[0])) {
			const persistedState = {};
			for (const key of PERSISTED_MODULES) {
				persistedState[key] = state[key];
			}
			console.log('[TLL] Saving state', persistedState);
			window.localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(persistedState));
		}
	});

	inject('loadPreviousState', () => {
		const previousState = JSON.parse(window.localStorage.getItem(LOCALE_STORAGE_KEY) || '{}');
		console.log('[TLL] Loading state', previousState);
		const mergedState = Object.assign({}, store.state, previousState);
		store.commit('INIT', mergedState);
	});
};
