export const state = () => ({
	lastUpdated: 0,
	role: 'attacker',
});

export const mutations = {
	SET_LAST_UPDATED(state, lastUpdated) {
		state.lastUpdated = lastUpdated;
	},
	SET_ROLE(state, role) {
		state.role = role;
	},
};
