import DB from '~/services/database';
import TORN from '@/services/torn';
import UPDATER from '@/services/updater';

export default ({ $axios, store }) => {
	DB.init();
	TORN.init($axios);
	UPDATER.init(store);
};
