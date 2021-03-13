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
				<KpiWidget />
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import KpiWidget from "@/components/KpiWidget.vue";
import RefreshWidget from "@/components/RefreshWidget.vue";

export default {
	components: { KpiWidget, RefreshWidget },
	computed: {
		...mapGetters(["clients", "days"]),
		...mapState(["names"]),
		clientsKpiLabels() {
			return this.clients
				.map((c) => this.names[c.defender_id] || c.defender_id)
				.slice(0, 3);
		},
		clientsKpiValues() {
			return this.clients.map((c) => c.attacks.length).slice(0, 3);
		},
		daysKpiValues() {
			const d = new Date();
			const today = d.toISOString().split("T")[0];
			d.setDate(d.getDate() - 1);
			const yesterday = d.toISOString().split("T")[0];
			const counts = Object.values(this.days);
			const avg = counts.reduce((sum, v) => (sum += v), 0) / counts.length;
			const avgRounded = Math.round(avg * 10) / 10;
			return [this.days[today], this.days[yesterday], avgRounded];
		},
	},
};
</script>
