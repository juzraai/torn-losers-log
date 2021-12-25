<template>
	<div>
		<AttacksChart
			:days="days"
			:items="items"
		/>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import DB from '@/services/database';

export default {
	data: () => ({
		days: [],
		items: [],
		limit: 31,
	}),
	computed: {
		...mapState('log', ['group', 'lastUpdated', 'paid', 'result', 'role']),
		...mapState('ui', ['loading']),
		thingsThatTriggerUpdate() {
			return [
				//
				this.group,
				this.lastUpdated,
				this.limit,
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
			this.days = DB.pastDays(this.limit);
			this.items = await DB.queryAttacks(
				this.role,
				this.result,
				this.paid,
				this.group,
				this.limit
			);
			this.SET_LOADING(false);
		},
	},
};
</script>
