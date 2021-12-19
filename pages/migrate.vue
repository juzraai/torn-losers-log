<template>
	<Screen title="Migrating..." />
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import DB from '@/services/database';
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

			this.SET_API_KEY(v1.apiKey);
			this.SET_DARK_MODE(v1.dark);
			this.SET_LAST_UPDATED(v1.lastUpdate);
			this.SET_PLAYER_ID(v1.playerId);

			const importedPlayers = [];
			Object.entries(v1.names).forEach(([playerId, name]) => {
				const id = Number('0' + playerId);
				if (id) {
					importedPlayers.push({ id, name });
				}
			});
			await DB.addPlayers(importedPlayers);

			for (let i = 0; i < v1.losses.length; i++) {
				const a = v1.losses[i];
				delete a.oldest; // no need for this
				a.attacker_id = v1.playerId;
				a.result = 'Lost'; // v1 only handled "Lost" and "Timeout", without distinction
				// v1 dumped `paid` and `price` fields too for some reason
				a.session = 0;
			}
			await DB.addAttacks(v1.losses);
			await DB.updateSessions(v1.playerId, null, 'Lost', 0);
			// no need to call for other defender/result combinations here

			v1Storage.clear();

			console.timeEnd('[TLL] Migrating of V1 store finished in');
		},
	},
};
</script>
