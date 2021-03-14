<template>
	<Widget :card-body-class="'pb-0 px-0'">
		<ul class="nav nav-tabs pl-3 mb-1">
			<li
				class="nav-item"
				:key="i"
				:title="t.tooltip"
				v-b-tooltip.hover.top
				v-for="(t, i) in tabs"
			>
				<span
					class="nav-link"
					:class="i === tab ? 'active' : null"
					role="button"
					@click="tab = i"
				>
					<i
						class="fas fa-fw mr-lg-1"
						:class="t.icon"
					></i>
					{{ t.title }}
				</span>
			</li>
		</ul>
		<List :mark-last="tab < 3" :list="list" />
	</Widget>
</template>

<script>
// TODO tab selection should be saved and loaded
import { mapGetters } from "vuex";
import List from "@/components/List.vue";
import Widget from "@/components/Widget.vue";

function tab(title, icon, tooltip) {
	return { title, icon, tooltip };
}

export default {
	components: { List, Widget },
	data() {
		return {
			tab: 0,
			tabs: [
				tab(
					"Losses",
					"fa-list",
					"Individual losses, just like on TORN or YATA."
				),
				tab(
					"Sessions",
					"fa-layer-group",
					"Consecutive losses grouped by client and payment status."
				),
				tab(
					"Clients",
					"fa-users",
					"Losses aggregated by client and payment status."
				),
				tab(
					"Unpaid",
					"fa-comment-dollar",
					"Unpaid losses aggregated by client."
				),
			],
		};
	},
	computed: {
		...mapGetters(["losses", "sessions", "clients", "unpaidClients"]),
		list() {
			const { losses, sessions, clients, unpaidClients } = this;
			return [losses, sessions, clients, unpaidClients][this.tab];
		},
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
