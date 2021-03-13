<template>
	<Widget card-class="alert-info">
		<h6 class="card-title">Log refreshed</h6>
		<h5 class="mb-3">
			<timeago
				:auto-update="60"
				:datetime="lastUpdate"
				v-if="lastUpdate"
			/>
		</h5>
		<div class="align-items-end d-flex flex-grow-1">
			<button
				class="btn btn-lg btn-info"
				title="1 API call"
				v-b-tooltip.hover.bottom
				@click="fetchLosses"
			>
				<i class="fas fa-sync-alt mr-2"></i>
				Refresh
			</button>
		</div>
	</Widget>
</template>

<script>
// TODO would be nice to have a "loading" in state which is not persisted

import { mapActions, mapState } from "vuex";
import Widget from "@/components/Widget.vue";

export default {
	components: { Widget },
	computed: {
		...mapState(["lastUpdate"]),
	},
	methods: {
		...mapActions(["fetchLosses"]),
	},
};
</script>
