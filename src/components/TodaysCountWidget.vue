<template>
	<KpiWidget
		:labels="['Losses today', 'yesterday', 'average']"
		:values="daysKpiValues"
	/>
</template>

<script>
import { mapGetters } from "vuex";
import KpiWidget from "@/components/KpiWidget.vue";

export default {
	components: { KpiWidget },
	computed: {
		...mapGetters(["avgLossesPerDay", "days"]),
		daysKpiValues() {
			const d = new Date();
			const today = d.toISOString().split("T")[0];
			d.setDate(d.getDate() - 1);
			const yesterday = d.toISOString().split("T")[0];
			return [this.days[today], this.days[yesterday], this.avgLossesPerDay];
		},
	},
};
</script>
