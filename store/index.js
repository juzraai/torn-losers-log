export const mutations = {
	INIT(state, newState) {
		const mergedState = Object.assign(state, newState);
		this.replaceState(mergedState);
	}
};
