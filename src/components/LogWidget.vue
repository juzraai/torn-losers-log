<template>
	<Widget :card-body-class="'p-0'">
		<ul class="bg-light mb-1 nav nav-tabs pl-3 pt-3">
			<li
				class="flex-grow-1 nav-item text-center"
				:key="i"
				:title="t.tooltip"
				v-b-tooltip.hover.top
				v-for="(t, i) in tabs"
			>
				<span
					class="nav-link"
					:class="i === tab ? 'active' : null"
					role="button"
					@click="setTab(i)"
				>
					<i
						class="fas fa-fw mr-md-1"
						:class="t.icon"
					></i>
					<span class="d-none d-md-inline">{{ t.title }}</span>
					<span class="font-weight-bold ml-1" v-if="i === 4">${{ formatPrice(unpaidTotal) }}</span>
				</span>
			</li>
		</ul>
		<Log :entries="entries" />
	</Widget>
</template>

<script>
// TODO that i===4 above is not the most elegant solution i guess :)

import { mapGetters, mapMutations, mapState } from "vuex";
import Log from "@/components/Log.vue";
import Widget from "@/components/Widget.vue";
import { formatPrice } from "@/services/tornFormat.js";

function tab(title, icon, tooltip) {
	return { title, icon, tooltip };
}

export default {
	components: { Log, Widget },
	data() {
		return {
			tabs: [
				tab(
					"Losses",
					"fa-list",
					"Individual losses, just like on TORN or YATA."
				),
				tab(
					"Sessions",
					"fa-layer-group",
					"Consecutive losses grouped by client, price and payment status."
				),
				tab(
					"Daily",
					"fa-calendar-day",
					"Losses aggregated by TCT date, client, price and payment status."
				),
				tab(
					"Contracts",
					"fa-users",
					"Losses aggregated by client, price and payment status."
				),
				tab(
					"Unpaid",
					"fa-comment-dollar",
					"Unpaid losses aggregated by client and price."
				),
			],
		};
	},
	computed: {
		...mapState(["tab"]),
		...mapGetters(["losses", "sessions", "dailyClients", "clients", "unpaidClients", "unpaidTotal"]),
		entries() {
			const { losses, sessions, dailyClients, clients, unpaidClients } = this;
			return [losses, sessions, dailyClients, clients, unpaidClients][this.tab];
		},
	},
	methods: {
		...mapMutations(["setTab"]),
		formatPrice
	},
};
</script>

<style scoped>
.nav-link.active {
	color: black;
}

.nav-link:not(.active):not(:hover) {
	opacity: 0.6;
}
</style>
