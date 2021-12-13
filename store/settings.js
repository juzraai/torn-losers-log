export const state = () => ({
	apiKey: '',
	darkMode: false,
});

export const mutations = {
	SET_API_KEY(state, apiKey) {
		state.apiKey = apiKey;
	},
	SET_DARK_MODE(state, darkMode) {
		state.darkMode = darkMode;
	}
};
