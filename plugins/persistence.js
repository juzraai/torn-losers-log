const COOKIE_NAME = 'TLLv2';

export default ({ app, store }) => {
	const previousState = app.$cookies.get(COOKIE_NAME);
	if (previousState) {
		console.log('[TLL] Loading previous state', previousState);
		store.commit('INIT', previousState);
	}
	store.subscribe((mutation, state) => {
		const keys = [
			'settings'
		];
		if (keys.includes(mutation.type.split('/')[0])) {
			const persistedState = {};
			for (const key of keys) {
				persistedState[key] = state[key];
			}
			console.log('[TLL] Saving state', persistedState);
			app.$cookies.set(COOKIE_NAME, persistedState);
		}
	});
};
