import DB from '~/services/database';
import TORN from '@/services/torn';

export default ({ $axios }) => {
	DB.init();
	TORN.init($axios);
};
