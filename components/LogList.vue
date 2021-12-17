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
			>{{ i }}</li>
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
		...mapState('log', ['lastUpdated', 'paid', 'result', 'role']),
		...mapState('settings', ['playerId']),
		...mapState('ui', ['loading']),
		notFoundMessage() {
			const verb = this.result === 'Lost' ? 'lost to' : 'escaped from';
			return this.role === 'attacker'
				? `You haven't ${verb} anyone recently.`
				: `Nobody has ${verb} you recently.`;
		},
		thingsThatTriggerUpdate() {
			return [this.lastUpdated, this.paid, this.result, this.role].join(';');
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
			const criteria = {};
			criteria[`${this.role}_id`] = this.playerId;
			this.items = await this.$db.attacks
				.orderBy('timestamp_ended')
				.reverse()
				.filter(
					a =>
						a[`${this.role}_id`] === this.playerId &&
						a.result === this.result &&
						a.paid === this.paid
				)
				.limit(10)
				.toArray(); // TODO offset (don't add to store :))
			this.SET_LOADING(false);
		},
	},
};
</script>
