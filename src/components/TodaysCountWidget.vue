<template>
	<KpiWidget>
		<template slot="mainLabel">Losses today</template>
		<template slot="mainValue">{{ todaysLosses || 0 }}</template>

		<template slot="subLabel1">yesterday</template>
		<template slot="subValue1">{{ yesterdaysLosses || 0 }}</template>

		<template slot="subLabel2">average</template>
		<template slot="subValue2">{{ avgLossesPerDay }}</template>
	</KpiWidget>
</template>

<script>
import { mapGetters } from "vuex";
import KpiWidget from "@/components/KpiWidget.vue";

export default {
	components: { KpiWidget },
	computed: {
		...mapGetters(["avgLossesPerDay", "days"]),
		todaysLosses() {
			const today = new Date().toISOString().split("T")[0];
			return this.days[today];
		},
		yesterdaysLosses() {
			const d = new Date();
			d.setDate(d.getDate() - 1);
			const yesterday = d.toISOString().split("T")[0];
			return this.days[yesterday];
		},
	},
};
</script>
