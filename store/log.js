export const state = () => ({
	group: 'event',
	lastUpdated: 0,
	paid: true,
	result: 'Lost',
	role: 'attacker',
});

export const mutations = {
	SET_GROUP(state, group) {
		if ('event|session|contract'.includes(group)) {
			state.group = group;
		}
	},
	SET_LAST_UPDATED(state, lastUpdated) {
		state.lastUpdated = lastUpdated;
	},
	SET_PAID(state, paid) {
		state.paid = paid;
	},
	SET_RESULT(state, result) {
		if ('Lost|Escape'.includes(result)) {
			state.result = result;
		}
	},
	SET_ROLE(state, role) {
		if ('attacker|defender'.includes(role)) {
			state.role = role;
		}
	},
};
