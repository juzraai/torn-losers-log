<template>
	<div>
		<div class="row">
			<div class="col-sm-6 col-lg-3">
				<RefreshWidget />
			</div>
			<div class="col-sm-6 col-lg-3">
				<KpiWidget
					:labels="['Losses today', 'yesterday', 'average']"
					:values="daysKpiValues"
				/>
			</div>
			<div class="col-sm-6 col-lg-3">
				<KpiWidget
					:labels="clientsKpiLabels"
					:values="clientsKpiValues"
				/>
			</div>
			<div class="col-sm-6 col-lg-3">
				<BarChartWidget
					:avg="daysAvg"
					:bars="bars"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import BarChartWidget from "@/components/BarChartWidget.vue";
import KpiWidget from "@/components/KpiWidget.vue";
import RefreshWidget from "@/components/RefreshWidget.vue";

export default {
	components: { BarChartWidget, KpiWidget, RefreshWidget },
	computed: {
		...mapGetters(["clients", "days"]),
		...mapState(["names"]),

		// move these computeds into separate components
		clientsKpiLabels() {
			return this.clients
				.map((c) => this.names[c.defender_id] || c.defender_id)
				.slice(0, 3);
		},
		clientsKpiValues() {
			return this.clients.map((c) => c.attacks.length).slice(0, 3);
		},
		daysAvg() {
			const counts = Object.values(this.days);
			counts.shift(); // removing newest day as it's likely incomplete
			counts.pop(); // removing oldest day as it's likely incomplete
			const avg = counts.reduce((sum, v) => (sum += v), 0) / counts.length;
			return Math.round(avg * 10) / 10;
		},
		daysKpiValues() {
			const d = new Date();
			const today = d.toISOString().split("T")[0];
			d.setDate(d.getDate() - 1);
			const yesterday = d.toISOString().split("T")[0];
			return [this.days[today], this.days[yesterday], this.daysAvg];
		},
		bars() {
			return Object.entries(this.days)
				.map(([day, value]) => ({
					value,
					label: `${value} losses on <br>${day}`,
				}))
				.map((bar, i) => {
					if (i === 0) bar.highlight = true;
					return bar;
				})
				.reverse() // now [0] is the oldest day
				.filter((_, i) => i > 0); // removing oldest day as it's likely incomplete
		},
	},
};
</script>
