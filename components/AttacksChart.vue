<template>
	<Card>
		<div class="card-body">
			<h6 class="mb-4">{{ title }}</h6>
			<div class="grid">
				<div class="border-bottom d-flex flex-column justify-content-between px-2 text-muted text-right">
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
						:key="role+result+i"
						v-b-tooltip.bottom.html
						class="bar bg-primary flex-grow-1"
						:style="{ height: 100 * attacks.length / max + '%' }"
						:title="labels[i]"
					/>
				</div>
				<div
					class="border-left d-flex p-2 text-muted"
					style="grid-column-start: 2"
				>
					<div class="d-none d-sm-block mr-auto">{{ format(days[days.length - 1]) }}</div>
					<div class="d-sm-none mx-auto">Days</div>
					<div class="d-none d-sm-block ml-auto">{{ format(days[0]) }}</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script>
import dayjs from 'dayjs';
import { mapState } from 'vuex';
import { RESULT, ROLE } from '@/services/database';

export default {
	props: {
		days: {
			type: Array,
			default: () => [],
		},
		items: {
			type: Array,
			default: () => [],
		},
	},
	data: () => ({
		limit: 31,
	}),
	computed: {
		...mapState('log', ['result', 'role']),
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
		title() {
			const direction = this.role === ROLE.ATTACKER ? 'Outgoing' : 'Incoming';
			const outcome = this.result === RESULT.LOST ? 'losses' : 'escapes';
			return `${direction} ${outcome} in the past ${this.items.length} days`;
		},
	},
	methods: {
		format(ts) {
			return dayjs(ts).format('DD/MM/YY');
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
	z-index: 1;
}

.bar {
	margin: 0 2px;
}

.bar:nth-child(2) {
	/* 1st child is .avg */
	margin-left: 0px;
}

.bar:last-child {
	margin-right: 0px;
}

.grid {
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: auto auto;
	gap: 0px 0px;
}
</style>
