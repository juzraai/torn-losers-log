<template>
	<Widget>
		<h6 class="card-title">
			<slot name="mainLabel" />
		</h6>
		<h1 class="border-bottom font-weight-bold pb-2" :class="dark ? 'border-secondary' : null">
			<slot name="mainValue" />
		</h1>
		<div class="row">
			<div
				class="col-6"
				:key="i"
				v-for="i in 2"
			>
				<h5 class="font-weight-bold mb-1">
					<slot :name="'subValue' + i" />
				</h5>
				<div class="small text-truncate">
					<slot :name="'subLabel' + i" />
				</div>
			</div>
		</div>
	</Widget>
</template>

<script>
import { mapState } from "vuex";
import Widget from "@/components/Widget.vue";

export default {
	components: { Widget },
	props: ["labels", "values"],
	computed: {
		...mapState(["dark"]),
	},
};
</script>
