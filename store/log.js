export const state = () => ({
	lastUpdated: 0,
});

export const mutations = {
	SET_LAST_UPDATED(state, lastUpdated) {
		this.lastUpdated = lastUpdated;
	},
};
