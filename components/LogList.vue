<template>
	<div class="card shadow">
		<ul class="list-group list-group-flush">
			<li
				v-for="i in items"
				:key="i.code || i.group"
				class="list-group-item"
			>{{ i }}</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data: () => ({
		items: [],
	}),
	computed: {
		...mapState('log', ['lastUpdated', 'role']),
		...mapState('settings', ['playerId']),
	},
	watch: {
		role() {
			this.query();
		},
	},
	mounted() {
		this.query();
	},
	methods: {
		async query() { // TODO add querying (loading) phase and visual indicator
			const criteria = {};
			criteria[`${this.role}_id`] = this.playerId;
			this.items = await this.$db.attacks
				.orderBy('timestamp_ended')
				.reverse()
				.filter(a => a[`${this.role}_id`] === this.playerId)
				.limit(10)
				.toArray(); // TODO offset (don't add to store :))
		},
	},
};
</script>
