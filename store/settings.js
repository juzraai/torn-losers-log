export const state = () => ({
	apiKey: '',
	darkMode: false,
	listLimit: 10,
	playerId: 0, // automatically set on /connect
	updateIntervalMs: 0,
	updateOnLoad: false,
});

export const mutations = {
	SET_API_KEY(state, apiKey) {
		state.apiKey = apiKey;
	},
	SET_DARK_MODE(state, darkMode) {
		state.darkMode = darkMode;
	},
	SET_LIST_LIMIT(state, listLimit) {
		state.listLimit = listLimit;
	},
	SET_PLAYER_ID(state, playerId) {
		state.playerId = playerId;
	},
	SET_UPDATE_INTERVAL_MS(state, updateIntervalMs) {
		state.updateIntervalMs = updateIntervalMs;
	},
	SET_UPDATE_ON_LOAD(state, updateOnLoad) {
		state.updateOnLoad = updateOnLoad;
	},
};
