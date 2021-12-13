export const plugins = [
	store => {
		// TODO load persisted state, call store.replaceState(Object.assign(store.state), loadedState)
		store.subscribe((mutation, state) => {
			// TODO store state.settings, state.ui, ...
		});
	}
];
