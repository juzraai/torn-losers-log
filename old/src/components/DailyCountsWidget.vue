<template>
	<BarChartWidget
		:avg="avgLossesPerDay"
		:bars="bars"
		:cardTitle="`Last ${bars.length} days`"
	/>
</template>

<script>
import { mapGetters } from "vuex";
import BarChartWidget from "@/components/BarChartWidget.vue";

export default {
	components: { BarChartWidget },
	computed: {
		...mapGetters(["avgLossesPerDay", "days"]),
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
				.slice(0, 31)
				.reverse() // now [0] is the oldest day
				.filter((_, i) => i > 0); // removing oldest day as it's likely incomplete
		},
	},
};
</script>
