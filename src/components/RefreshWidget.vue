<template>
	<Widget card-class="alert-info">
		<h6 class="card-title">
			<strong
				title="This includes losses to NPCs too."
				v-b-tooltip.hover.top
			>{{ losses.length }}</strong>
			losses between
		</h6>
		<p
			class="flex-grow-1"
			v-if="losses.length"
		>
			{{ formatTimestamp(losses[0].timestamp_ended) }}
			<br>
			{{ formatTimestamp(losses[losses.length - 1].timestamp_ended) }}
		</p>
		<div class="align-items-center d-flex">
			<button
				class="btn btn-info mr-3"
				title="1 API call. Keep in mind that TORN API returns your last 1000 attacks, so you should update TLL regularly."
				v-b-tooltip.hover.bottom
				@click="fetchLosses"
			>
				<i class="fas fa-sync-alt"></i>
			</button>
			<timeago
				:auto-update="60"
				class="small"
				:datetime="lastUpdate"
				v-if="lastUpdate"
			/>
		</div>
	</Widget>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Widget from "@/components/Widget.vue";
import { formatTimestamp } from "@/services/tornFormat.js";

export default {
	components: { Widget },
	computed: {
		...mapState(["lastUpdate", "losses"]),
	},
	methods: {
		...mapActions(["fetchLosses"]),
		formatTimestamp,
	},
};
</script>
