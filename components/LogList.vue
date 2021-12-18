<template>
	<Card>
		<ul class="list-group list-group-flush">
			<li
				v-if="loading"
				class="list-group-item"
			>
				Loading...
			</li>
			<li
				v-else-if="!items.length"
				class="list-group-item"
			>
				{{ notFoundMessage }}
			</li>
			<li
				v-for="i in items"
				v-else
				:key="i.code || i.group"
				class="list-group-item"
			>
				<LogListItem :attacks="i" />
			</li>
		</ul>
	</Card>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import DB from '@/services/database';

export default {
	data: () => ({
		items: [],
		limit: 10, // TODO offset?
	}),
	computed: {
		...mapState('log', ['group', 'lastUpdated', 'paid', 'result', 'role']),
		...mapState('settings', ['playerId']),
		...mapState('ui', ['loading']),
		notFoundMessage() {
			const verb = this.result === 'Lost' ? 'lost to' : 'escaped from';
			return this.role === 'attacker'
				? `You haven't ${verb} anyone recently.`
				: `Nobody has ${verb} you recently.`;
		},
		thingsThatTriggerUpdate() {
			return [
				this.group,
				this.lastUpdated,
				this.paid,
				this.result,
				this.role,
			].join(';');
		},
	},
	watch: {
		thingsThatTriggerUpdate() {
			this.query();
		},
	},
	mounted() {
		this.query();
	},
	methods: {
		...mapMutations('ui', ['SET_LOADING']),
		async query() {
			// TODO limit & offset setting (NOT in store, just here on page), pass to query methods
			this.SET_LOADING(true);
			console.time('QUERY');
			if (this.group === 'event') {
				await this.eventQuery();
				/* } else if (this.group === 'session') {
				await this.sessionQuery(); */
			}
			console.timeEnd('QUERY');
			this.SET_LOADING(false);
		},
		async eventQuery() {
			const attacks = await DB.query(
				'timestamp_ended',
				this.role === 'attacker' ? this.playerId : false,
				this.role === 'defender' ? this.playerId : false,
				this.result,
				this.paid,
				10
			);
			this.items = attacks.map(a => [a]);
		},
	},
};
</script>
