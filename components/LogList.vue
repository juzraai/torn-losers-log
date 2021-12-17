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

export default {
	data: () => ({
		items: [],
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
			this.SET_LOADING(true);
			if (this.group === 'event') {
				await this.eventQuery();
			} else {
				const key = 'group'; // TODO handle session and contract mode
				await this.groupedQuery(key);
			}
			this.SET_LOADING(false);
		},
		async eventQuery() {
			const attacks = await this.$db.attacks
				.orderBy('timestamp_ended')
				.reverse()
				.filter(
					a =>
						a[`${this.role}_id`] === this.playerId &&
						a.result === this.result &&
						a.paid === this.paid
				)
				.limit(10) // TODO offset? (don't add to store)
				.toArray();
			this.items = attacks.map(a => ([a]));
		},
		async groupedQuery(key) {
			const groups = [];
			await this.$db.attacks
				.orderBy(key)
				.reverse()
				.filter(
					a =>
						a[`${this.role}_id`] === this.playerId &&
						a.result === this.result &&
						a.paid === this.paid
				)
				.limit(10) // TODO offset? (don't add to store)
				.uniqueKeys(g => groups.push(...g));
			this.items = await Promise.all(
				groups.map(async g => {
					const attacks = await this.$db.attacks
						.orderBy('timestamp_ended')
						.reverse()
						.filter(a => a.group === g)
						.toArray();
					return attacks;
				})
			);
		},
	},
};
</script>
