export const state = () => ({
	loading: true,
});

export const mutations = {
	SET_LOADING(state, loading) {
		state.loading = loading;
	},
};
