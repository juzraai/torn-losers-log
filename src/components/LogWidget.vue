<template>
	<Widget :card-body-class="'px-0'">
		<ul class="nav nav-tabs pl-3">
			<li
				class="nav-item"
				:key="i"
				:title="t.tooltip"
				v-b-tooltip.hover.bottom
				v-for="(t, i) in tabs"
			>
				<span
					class="nav-link"
					:class="i === tab ? 'active' : null"
					role="button"
				>
					<i
						class="fas fa-fw mr-lg-1"
						:class="t.icon"
					></i>
					{{ t.title }}
				</span>
			</li>
		</ul>
	</Widget>
</template>

<script>
// TODO tab selection should be saved and loaded
import Widget from "@/components/Widget.vue";

function tab(title, icon, tooltip) {
	return { title, icon, tooltip };
}

export default {
	components: { Widget },
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
					"Groups consecutive losses by client and payment status."
				),
				tab(
					"Clients",
					"fa-user",
					"Losses aggregated by client and payment status."
				),
			],
		};
	},
};
</script>
