export const state = () => ({
	censored: false,
	loading: true,
});

export const mutations = {
	SET_LOADING(state, loading) {
		state.loading = loading;
	},
	TOGGLE_CENSORED(state) {
		state.censored = !state.censored;
	},
};
