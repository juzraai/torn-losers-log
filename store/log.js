import { GROUPING, RESULT, ROLE } from '@/services/database';

export const state = () => ({
	group: 'session',
	lastUpdated: 0,
	paid: true,
	result: 'Lost',
	role: 'attacker',
});

export const mutations = {
	SET_GROUP(state, group) {
		if (Object.values(GROUPING).includes(group)) {
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
		if (Object.values(RESULT).includes(result)) {
			state.result = result;
		}
	},
	SET_ROLE(state, role) {
		if (Object.values(ROLE).includes(role)) {
			state.role = role;
		}
	},
};
