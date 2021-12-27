<template>
	<DashWidget title="Attacks">
		<div class="grid flex-grow-1">
			<div class="border-bottom d-flex flex-column justify-content-between px-2 text-muted text-right">
				<div>{{ max }}</div>
				<div>0</div>
			</div>
			<div
				class="align-items-end border-bottom border-left d-flex flex-row-reverse position-relative"
				style="min-height: 300px;"
			>
				<div
					class="avg border-bottom position-absolute px-1 text-info w-100"
					:style="{ bottom: avg ? (100 * avg / max) + '%' : 0 }"
					v-text="'Avg'"
				/>
				<div
					v-for="(attacks, i) in items.slice(0, limit)"
					:key="i+role+result+attacks.length"
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
				<div class="d-sm-none mx-auto">Past 7 days</div>
				<div class="d-none d-sm-block ml-auto">{{ format(days[0]) }}</div>
			</div>
		</div>
	</DashWidget>
</template>

<script>
import dayjs from 'dayjs';
import { mapState } from 'vuex';

export default {
	props: {
		avg: {
			type: Number,
			default: 0,
		},
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
		max() {
			return Math.max(...this.items.map(attacks => attacks.length));
		},
	},
	mounted() {
		window.addEventListener('resize', () => {
			const w = window.innerWidth;
			this.limit = w < 576 ? 7 : 31;
		});
	},
	methods: {
		format(ts) {
			return dayjs(ts).format('DD/MM/YY');
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";
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
	grid-template-rows: auto min-content;
	gap: 0px 0px;
}
</style>
