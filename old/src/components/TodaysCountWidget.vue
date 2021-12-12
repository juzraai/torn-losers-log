<template>
	<KpiWidget>
		<template #mainLabel>Losses today</template>
		<template #mainValue>{{ todaysLosses || 0 }}</template>

		<template #subLabel1>yesterday</template>
		<template #subValue1>{{ yesterdaysLosses || 0 }}</template>

		<template #subLabel2>average</template>
		<template #subValue2>
			<span
				title="Most recent day and oldest day are both excluded as they may be incomplete."
				v-b-tooltip.hover.top
			>{{ avgLossesPerDay }}</span>
		</template>
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
