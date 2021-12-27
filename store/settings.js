export const state = () => ({
	announcedVersion: '1.6.0',
	apiKey: '',
	beggedForUpvote: false,
	darkMode: false,
	listLimit: 10,
	nameResolverIntervalMs: 0,
	playerId: 0, // automatically set on /connect
	updateIntervalMs: 0,
	updateOnLoad: false,
});

export const mutations = {
	SET_ANNOUNCED_VERSION(state, announcedVersion) {
		state.announcedVersion = announcedVersion;
	},
	SET_API_KEY(state, apiKey) {
		state.apiKey = apiKey;
	},
	SET_BEGGED_FOR_UPVOTE(state, beggedForUpvote) {
		state.beggedForUpvote = beggedForUpvote;
	},
	SET_DARK_MODE(state, darkMode) {
		state.darkMode = darkMode;
	},
	SET_LIST_LIMIT(state, listLimit) {
		state.listLimit = listLimit;
	},
	SET_NAME_RESOLVER_INTERVAL_MS(state, nameResolverIntervalMs) {
		state.nameResolverIntervalMs = nameResolverIntervalMs;
	},
	SET_PLAYER_ID(state, playerId) {
		state.playerId = playerId;
	},
	SET_UPDATE_INTERVAL_MS(state, updateIntervalMs) {
		state.updateIntervalMs = updateIntervalMs;
	},
	SET_UPDATE_ON_LOAD(state, updateOnLoad) {
		state.updateOnLoad = updateOnLoad;
	},
};
