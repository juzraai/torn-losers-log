<template>
	<Widget :title="title">
		<div class="align-items-end d-flex flex-grow-1 position-relative">
			<div
				class="avg border border-info position-absolute w-100"
				:style="{ bottom: avg + '%' }"
				v-if="avg"
			></div>
			<div
				class="bar flex-grow-1"
				:class="bar.highlight ? 'bg-info' : null"
				:key="i"
				:style="{ backgroundColor: bar.color, height: 100 * bar.value / max + '%' }"
				:title="bar.label"
				v-b-tooltip.hover.bottom.html
				v-for="(bar,i) in barsAug"
			></div>
		</div>
	</Widget>
</template>

<script>
import Widget from "@/components/Widget.vue";

export default {
	components: { Widget },
	props: ["avg", "bars", "title"],
	computed: {
		barsAug() {
			return this.bars.map((bar) => {
				bar.color = `rgba(0, 123, 255, ${0.25 + 0.75 * bar.value / this.max})`;
				return bar;
			});
		},
		max() {
			return Math.max(...this.bars.map((b) => b.value));
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

.avg {
	left: 0;
	opacity: 0.3;
	transition: bottom 0.2s;
}

.bar {
	margin: 0 2px;
	transition: height 0.2s;
	z-index: 1;
}

.bar:nth-child(2) {
	/* 1st child is .avg */
	margin-left: 0px;
}

.bar:last-child {
	margin-right: 0px;
}

@include media-breakpoint-down(xs) {
	.widget {
		height: 256px !important;
	}
}
</style>
