<template>
	<Screen title="Migrating..." />
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { TLLAttack } from '@/models/Attack';
import DB, { RESULT, ROLE } from '@/services/database';
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

			// modifying array in-place
			for (let i = 0; i < v1.losses.length; i++) {
				// eslint-disable-next-line camelcase
				const { code, defender_id, paid, price, timestamp_ended } =
					v1.losses[i];
				v1.losses[i] = new TLLAttack({
					code,
					opponentId: defender_id,
					paid,
					price,
					timestamp: timestamp_ended,
				});
			}
			await DB.addAttacks(ROLE.ATTACKER, RESULT.LOST, v1.losses);

			v1Storage.clear();

			console.timeEnd('[TLL] Migrating of V1 store finished in');
		},
	},
};
</script>
