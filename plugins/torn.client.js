import TORN from '@/services/torn';

export default ({ $axios, store }) => {
	// Just initializing the service. :)
	TORN.init($axios);
};
