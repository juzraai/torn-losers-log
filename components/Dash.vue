<template>
	<Card>
		<div class="card-body d-flex">
			<div class="d-flex flex-column w-100">
				<h6>Last {{ items.length }} days</h6>
				<div class="d-flex flex-column">
					<div
						class="align-items-end d-flex flex-grow-1 flex-row-reverse position-relative"
						style="min-height: 300px;"
					>
						<div
							class="avg bg-info position-absolute w-100"
							:style="{ bottom: avg ? (100 * avg / max) + '%' : 0 }"
						/>
						<div
							v-for="(attacks, i) in items"
							:key="days[i]"
							v-b-tooltip.hover.bottom.html
							class="bg-primary flex-grow-1 transitions"
							:style="{ height: 100 * attacks.length / max + '%' }"
							:title="labels[i]"
						/>
					</div>
				</div>
			</div>
		</div>
	</Card>
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
				const d = dayjs(this.days[i]).format('DD/MM/YY');
				return `<strong>${attacks.length}</strong> attack${
					attacks.length === 1 ? '' : 's'
				} on <strong>${d}</strong>`;
			});
		},
		avg() {
			if (this.items.length) {
				const sum = this.items
					.map(attacks => attacks.length)
					.reduce((sum, len) => sum + len);
				return sum / this.items.length;
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

<style scoped>
.avg {
	height: 2px;
	left: 0;
	opacity: 0.3;
	transition: bottom 0.2s;
}

.bar {
	margin: 0 2px;
	transition: height 0.2s;
	z-index: 1;
}

.bar:nth-child(2) {
	/* 1st child is .avg */
	margin-left: 0px;
}

.bar:last-child {
	margin-right: 0px;
}
</style>
