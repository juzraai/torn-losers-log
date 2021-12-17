export const state = () => ({
	lastUpdated: 0,
	paid: true,
	result: 'Lost',
	role: 'attacker',
});

export const mutations = {
	SET_LAST_UPDATED(state, lastUpdated) {
		state.lastUpdated = lastUpdated;
	},
	SET_PAID(state, paid) {
		state.paid = paid;
	},
	SET_RESULT(state, result) {
		state.result = result;
	},
	SET_ROLE(state, role) {
		state.role = role;
	},
};
