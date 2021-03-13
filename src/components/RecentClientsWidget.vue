<template>
	<KpiWidget
		:labels="clientsKpiLabels"
		:values="clientsKpiValues"
	/>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import KpiWidget from "@/components/KpiWidget.vue";

export default {
	components: { KpiWidget },
	computed: {
		...mapGetters(["clients"]),
		...mapState(["names"]),
		clientsKpiLabels() {
			return this.clients
				.map((c) => this.names[c.defender_id] || c.defender_id)
				.slice(0, 3);
		},
		clientsKpiValues() {
			return this.clients.map((c) => c.attacks.length).slice(0, 3);
		},
	},
};
</script>
