<template>
	<Widget>
		<div class="align-items-end d-flex flex-grow-1 position-relative">
			<div
				class="avg border border-secondary position-absolute w-100"
				:style="{ bottom: avg + '%' }"
				v-if="avg"
			></div>
			<div
				class="bar flex-grow-1"
				:class="bar.highlight ? 'bg-info' : 'bg-primary'"
				:key="i"
				:style="{ height: 100 * bar.value / max + '%' }"
				:title="bar.label"
				v-b-tooltip.hover.bottom.html
				v-for="(bar,i) in bars"
			></div>
		</div>
	</Widget>
</template>

<script>
import Widget from "@/components/Widget.vue";

export default {
	components: { Widget },
	props: ["avg", "bars"],
	computed: {
		max() {
			return Math.max(...this.bars.map((b) => b.value));
		},
	},
};
</script>

<style scoped>
.avg {
	left: 0;
	margin: 0 2px;
	opacity: 0.5;
	transition: bottom 0.2s;
}

.bar {
	margin: 0 2px;
	transition: height 0.2s;
	z-index: 1;
}
</style>
