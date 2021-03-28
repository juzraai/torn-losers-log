<template>
	<KpiWidget
		title='Most recent clients and their counts. Green means "paid". See more on Clients tab below.'
		v-b-tooltip.hover.top
	>
		<template #mainLabel>
			<Player
				:id="clients[0].defender_id"
				:variant="clients[0].paid ? 'success' : null"
				v-if="clients[0]"
			/>
		</template>
		<template
			#mainValue
			v-if="clients[0]"
		>{{ clients[0].attacks.length }}</template>

		<template v-for="i in 2">
			<template :slot="'subLabel' + i">
				<Player
					:key="i"
					:id="clients[i].defender_id"
					:variant="clients[i].paid ? 'success' : null"
					v-if="clients[i]"
				/>
			</template>
			<template
				:slot="'subValue' + i"
				v-if="clients[i]"
			>{{ clients[i].attacks.length }}</template>
		</template>
	</KpiWidget>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import KpiWidget from "@/components/KpiWidget.vue";
import Player from "@/components/Player.vue";

export default {
	components: { KpiWidget, Player },
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
