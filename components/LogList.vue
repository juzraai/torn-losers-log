<template>
	<Card>
		<div class="card-header p-0">
			<LogListHeader />
		</div>
		<ul class="list-group list-group-flush">
			<li
				v-if="!items.length"
				class="list-group-item"
			>
				{{ notFoundMessage }}
			</li>
			<li
				v-for="attacks in items"
				v-else
				:key="`${attacks[0].code}/${attacks[0].session}`"
				class="list-group-item p-0"
			>
				<LogListItem
					:attacks="attacks"
					__attacksUpdated="query"
				/>
			</li>
		</ul>
	</Card>
</template>

<script>
import { liveQuery } from 'dexie';
import { mapMutations, mapState } from 'vuex';
import DB from '@/services/database';

export default {
	data: () => ({
		limit: 10, // TODO offset?
		liveQueryInit: 0,
		liveQueries: {
			attackerLost: [],
			attackerEscape: [],
			defenderLost: [],
			defenderEscape: [],
		},
	}),
	computed: {
		...mapState('log', ['group', 'lastUpdated', 'paid', 'result', 'role']),
		...mapState('settings', ['playerId']),
		...mapState('ui', ['loading']),
		items() {
			return this.liveQueries[`${this.role}${this.result}`];
		},
		notFoundMessage() {
			const verb = this.result === 'Lost' ? 'lost to' : 'escaped from';
			return this.role === 'attacker'
				? `You haven't ${verb} anyone recently.`
				: `Nobody has ${verb} you recently.`;
		},
		thingsThatTriggerUpdate() {
			return [
				this.paid,
				// TODO limit, offset
			].join(';');
		},
	},
	watch: {
		thingsThatTriggerUpdate() {
			this.init();
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		...mapMutations('ui', ['SET_LOADING']),
		init() {
			const liveQueryInit = new Date().getTime();
			this.liveQueryInit = liveQueryInit;
			for (const role of ['attacker', 'defender']) {
				for (const result of ['Lost', 'Escape']) {
					liveQuery(async () => {
						if (liveQueryInit !== this.liveQueryInit) {
							// cancelling live query
							return false;
						}
						console.log('Running live query', role, result);
						this.SET_LOADING(true);
						const items = await DB.queryAttacks(
							role,
							result,
							this.paid,
							this.group,
							10
						);
						return items;
					}).subscribe(items => {
						if (items) {
							this.liveQueries[`${role}${result}`] = items;
							this.SET_LOADING(false);
							// wonky a bit: list displays before items are updated
						}
					});
				}
			}
		},
	},
};
</script>
