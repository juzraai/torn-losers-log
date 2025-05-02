import DB from './database';
import TORN from './torn';

let $store = null;

export default {
	init($storeInstance) {
		$store = $storeInstance;
		return this;
	},
	schedule() {
		if (window.tllNameResolverTimeout) {
			console.log('[TLL] Scheduled name resolving cancelled');
		}
		clearTimeout(window.tllNameResolverTimeout);
		const interval = $store.state.settings.nameResolverIntervalMs;
		if (interval) {
			console.log('[TLL] Scheduled name resolving in ', interval);
			window.tllNameResolverTimeout = setTimeout(async () => {
				await this.resolveAName();
				this.schedule(); // reschedule
			}, interval);
		}
	},
	async resolveAName() {
		const id = await DB.findAnUnresolvedPlayerId();
		if (id) {
			const apiKey = $store.state.settings.apiKey;
			console.log('[TLL] Resolving name for ID', id);
			const { name } = await TORN.basic(apiKey, id);
			if (name) {
				return DB.addPlayers([{ id, name }]);
			}
		} else {
			console.log('[TLL] All names are resolved, this feature can be turned off!');
		}
	},
};
