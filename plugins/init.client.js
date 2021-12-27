import DB from '~/services/database';
import NAME_RESOLVER from '@/services/name-resolver';
import TORN from '@/services/torn';
import UPDATER from '@/services/updater';

export default ({ $axios, store }) => {
	DB.init();
	NAME_RESOLVER.init(store);
	TORN.init($axios);
	UPDATER.init(store);

	window.toggleCensored = () => store.commit('ui/TOGGLE_CENSORED');
};
