<template>
	<div class="d-flex flex-column gap">
		<Card>
			<div class="card-header font-weight-bold">{{ title }}</div>
		</Card>
		<div class="d-flex flex-column flex-lg-row gap">
			<div class="col col-12 col-lg-5 col-lg-4 gap grid">
				<DashWidget title="Total attacks">
					<h1>{{ total }}</h1>
				</DashWidget>
				<DashWidget title="Attacks/day">
					<h1>{{ Math.round(avg * 10) / 10 }}</h1>
				</DashWidget>
				<DashWidget title="Total attacks">
					<h1>{{ total }}</h1>
				</DashWidget>
				<DashWidget title="Total attacks">
					<h1>{{ total }}</h1>
				</DashWidget>
				<DashWidget title="Total attacks">
					<h1>{{ total }}</h1>
				</DashWidget>
				<DashWidget title="Total attacks">
					<h1>{{ total }}</h1>
				</DashWidget>
			</div>
			<div class="col d-flex">
				<AttacksChart
					class="flex-grow-1"
					:avg="avg"
					:days="days"
					:items="items"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import DB, { RESULT, ROLE } from '@/services/database';

/*
	attack count
	attacks/day
	player count
	money/attack
	money/day
	money made

*/

export default {
	data: () => ({
		days: [],
		items: [],
		limit: 31,
	}),
	computed: {
		...mapState('log', ['group', 'lastUpdated', 'paid', 'result', 'role']),
		...mapState('ui', ['loading']),
		avg() {
			if (this.items.length) {
				const lens = this.items
					.slice(1) // exclude today (incomplete)
					.map(attacks => attacks.length);
				const sum = lens.reduce((sum, len) => sum + len);
				return sum / lens.length;
			} else {
				return 0;
			}
		},
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
		title() {
			const direction = this.role === ROLE.ATTACKER ? 'Outgoing' : 'Incoming';
			const outcome = this.result === RESULT.LOST ? 'losses' : 'escapes';
			return `${direction} ${outcome} in the past ${this.items.length} days`;
		},
		total() {
			return this.items.reduce((sum, attacks) => sum + attacks.length, 0);
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

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

.col {
	margin: 0 !important;
	padding: 0 !important;
}

.grid {
	display: grid;
	grid-template-columns: 1fr 1fr;

	@include media-breakpoint-up(sm) {
		grid-template-columns: 1fr 1fr 1fr;
	}

	@include media-breakpoint-up(lg) {
		grid-template-columns: 1fr 1fr;
	}
}
</style>
