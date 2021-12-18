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
import TORN from '@/services/torn';

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
			} else if (this.group === 'session') {
				await this.sessionQuery();
			}
			console.timeEnd('QUERY');
			this.SET_LOADING(false);
		},
		_filter(a) {
			return (
				!TORN.NPCs.includes(a.attacker_id) &&
				!TORN.NPCs.includes(a.defender_id) &&
				a[`${this.role}_id`] === this.playerId &&
				a.result === this.result
			);
		},
		async eventQuery() {
			const attacks = await this.$db.attacks
				.orderBy('timestamp_ended')
				.reverse()
				.filter(a => this._filter(a) && (!a.paid || this.paid))
				.limit(this.limit)
				.toArray();
			this.items = attacks.map(a => [a]);
		},
		async sessionQuery() {
			let minTs = 0;
			if (!this.paid) {
				// we want to list only unpaid ones
				// lets help main query by giving a
				// starting point (oldest unpaid):
				const lastUnpaid = await this.$db.attacks
					.orderBy('timestamp_ended')
					.filter(a => this._filter(a) && !a.paid)
					.limit(1)
					.toArray()[0];
				minTs = lastUnpaid?.timestamp_ended || new Date().getTime();
			}

			const limit = this.limit;
			const groups = [];
			const batch = 100;
			for (
				let page = 0;
				groups.filter(g => !g[0].paid || this.paid).length < limit + 1;
				page++
			) {
				// we need to start (N+1)th group to know Nth group is complete
				// we also need to apply `paid` filter to groups

				const attacks = await this.$db.attacks
					.orderBy('timestamp_ended')
					.reverse()
					.filter(a => this._filter(a) && a.timestamp_ended >= minTs)
					.offset(page * batch)
					.limit(batch)
					.toArray();
				if (attacks.length) {
					attacks.forEach(attack => {
						if (!groups.length) {
							groups.push([attack]);
							return;
						}
						const group = groups[groups.length - 1];
						const prev = group[group.length - 1] || attack;
						if (
							attack.attacker_id === prev.attacker_id &&
							attack.defender_id === prev.defender_id &&
							attack.paid === prev.paid &&
							attack.price === prev.price
						) {
							group.push(attack);
						} else {
							groups.push([attack]);
						}
					});
				} else {
					break;
				}
			}
			this.items = groups.filter(g => !g[0].paid || this.paid).slice(0, limit); // crop the last incomplete group');
		},
	},
};
</script>
