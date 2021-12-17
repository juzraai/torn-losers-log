export const mutations = {
	INIT(state, newState) {
		const mergedState = {};
		Object.keys(state).forEach(k => {
			// we have to merge in key level
			// because if we merge at top level, new store fields get removed
			mergedState[k] = { ...state[k], ...newState[k] };
		});
		this.replaceState(mergedState);
	}
};
