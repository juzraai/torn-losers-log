<template>
	<Screen title="Migrating..." />
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import DB from '@/services/database';
import v1Compat from '@/services/v1-compat';
import v1Storage from '@/services/v1-storage';

export default {
	head: {
		title: 'Migrating...',
	},
	computed: {
		...mapState('settings', ['apiKey']),
	},
	async beforeMount() {
		await this.migrate();
		if (this.apiKey) {
			this.$router.replace('/log');
		} else {
			this.$router.replace('/connect');
		}
	},
	methods: {
		...mapMutations('log', ['SET_LAST_UPDATED']),
		...mapMutations('settings', [
			'SET_API_KEY',
			'SET_DARK_MODE',
			'SET_PLAYER_ID',
		]),
		async migrate() {
			const v1 = v1Storage.load();
			if (!v1) {
				return; // nothing to migrate
			}

			console.log('[TLL] Migrating V1 store...');
			console.time('[TLL] Migrating of V1 store finished in');

			const data = v1Compat.convert(v1);
			this.$loadPreviousState(data.store);
			await DB.loadDump(data.database);

			v1Storage.clear();

			console.timeEnd('[TLL] Migrating of V1 store finished in');
		},
	},
};
</script>
