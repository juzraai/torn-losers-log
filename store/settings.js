export const state = () => ({
	apiKey: '',
	darkMode: false,
	playerId: 0, // automatically set on /connect
	updateOnLoad: false,
});

export const mutations = {
	SET_API_KEY(state, apiKey) {
		state.apiKey = apiKey;
	},
	SET_DARK_MODE(state, darkMode) {
		state.darkMode = darkMode;
	},
	SET_PLAYER_ID(state, playerId) {
		state.playerId = playerId;
	},
	SET_UPDATE_ON_LOAD(state, updateOnLoad) {
		state.updateOnLoad = updateOnLoad;
	},
};
