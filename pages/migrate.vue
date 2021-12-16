<template>
	<Screen title="Migrating..." />
</template>

<script>
import { mapState } from 'vuex';
import V1 from '@/services/v1-storage';

export default {
	head: {
		title: 'Migrating...',
	},
	computed: {
		...mapState('settings', ['apiKey']),
	},
	beforeMount() {
		const v1 = V1.load();
		if (v1) {
			// TODO migrate
		} else if (this.apiKey) {
			this.$router.replace('/log');
		} else {
			this.$router.replace('/connect');
		}
	},
};
</script>
