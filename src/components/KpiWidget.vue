<template>
	<Widget>
		<h6
			class="card-title"
			v-html="(labels || [])[0] || '&nbsp;'"
		></h6>
		<h1
			class="border-bottom font-weight-bold pb-2"
			v-html="(values || [])[0] || '&nbsp;'"
		></h1>
		<div class="row">
			<div
				class="col-6"
				:key="i"
				v-for="i in 2"
			>
				<h5
					class="mb-1"
					v-html="(values || [])[i] || '&nbsp;'"
				></h5>
				<div
					class="small text-truncate"
					v-html="(labels || [])[i] || '&nbsp;'"
				></div>
			</div>
		</div>
	</Widget>
</template>

<script>
import Widget from "@/components/Widget.vue";

export default {
	components: { Widget },
	props: ["labels", "values", "variant"],
};
</script>
