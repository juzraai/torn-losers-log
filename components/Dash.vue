<template>
	<div>
		<Card>
			<div class="card-body">
				<h6 class="mb-4">Attacks in the past {{ items.length }} days</h6>
				<div class="d-flex">
					<div class="d-flex flex-column justify-content-between px-2 text-muted">
						<div>{{ max }}</div>
						<div>0</div>
					</div>
					<div
						class="align-items-end border-bottom border-left d-flex flex-grow-1 flex-row-reverse position-relative"
						style="height: 300px;"
					>
						<div
							class="avg border-bottom position-absolute px-1 text-info w-100"
							:style="{ bottom: avg ? (100 * avg / max) + '%' : 0 }"
							v-text="'Avg'"
						/>
						<div
							v-for="(attacks, i) in items"
							:key="days[i]"
							v-b-tooltip.bottom.html
							class="bar bg-primary flex-grow-1"
							:style="{ height: 100 * attacks.length / max + '%' }"
							:title="labels[i]"
						/>
					</div>
				</div>
				<div class="d-flex p-2 text-muted">
					<div class="d-none d-sm-block mr-auto">{{ format(days[days.length - 1]) }}</div>
					<div class="d-sm-none mx-auto">Days</div>
					<div class="d-none d-sm-block ml-auto">{{ format(days[0]) }}</div>
				</div>
			</div>
		</Card>
	</div>
</template>

<script>
import dayjs from 'dayjs';
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
		labels() {
			return this.items.map((attacks, i) => {
				const d = this.format(this.days[i]);
				return `<strong>${attacks.length}</strong> attack${
					attacks.length === 1 ? '' : 's'
				} on <strong>${d}</strong>`;
			});
		},
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
		max() {
			return Math.max(...this.items.map(attacks => attacks.length));
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
		format(ts) {
			return dayjs(ts).format('DD/MM/YY');
		},
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

.avg {
	border-color: $info !important;
	left: 0;
	pointer-events: none;
	transition: bottom 0.2s;
	z-index: 1;
}

.bar {
	margin: 0 2px;
	transition: height 0.2s;
}

.bar:nth-child(2) {
	/* 1st child is .avg */
	margin-left: 0px;
}

.bar:last-child {
	margin-right: 0px;
}
</style>
