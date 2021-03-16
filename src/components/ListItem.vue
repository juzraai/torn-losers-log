<template>
	<div
		class="align-items-center d-flex list-group-item list-group-item-action px-2 py-1"
		:class="a.paid ? 'text-muted' : null"
	>
		<small class="d-none d-sm-block mr-3 text-muted">
			{{ formatTimestamp(a.timestamp_ended) }}
			<span v-if="a.timestamp_started">
				<br>
				{{ formatTimestamp(a.timestamp_started) }}
			</span>
		</small>
		<div>
			You lost
			<strong v-if="a.attacks">{{ a.attacks.length }}x</strong>
			to
			<br class="d-md-none">
			<Player
				class="font-weight-bold"
				:id="a.defender_id"
				:variant="a.paid ? 'muted' : 'dark'"
			/>
			<span
				class="badge alert-success ml-2 px-2"
				v-if="a.paid"
			>paid</span>
			<span
				class="badge badge-danger ml-2 px-2"
				:title="a.attacks ? 'This is the oldest loss group in the log. It\'s probably incomplete and may decrease/disappear with the next refresh.' : 'This is the oldest loss in the log. It may disappear with the next refresh.'"
				v-b-tooltip.hover.bottom
				v-if="a.oldest"
			>oldest</span>
		</div>
		<div class="ml-auto my-1">
			<button
				class="btn btn-sm btn-outline-success"
				title="Marks this and all previous losses to this client as <strong>paid</strong>"
				v-b-tooltip.hover.left.html
				v-if="!a.paid"
				@click="markAsPaid(a)"
			>
				<i class="fas fa-dollar-sign fa-fw mr-md-1"></i>
				<span class="d-none d-md-inline">Mark as <strong>paid</strong></span>
			</button>
			<button
				class="btn btn-sm btn-outline-danger mark-unpaid-btn"
				role="button"
				title="Marks this and all newer losses to this client as <strong>unpaid</strong>"
				v-b-tooltip.hover.left.html
				v-else
				@click="markAsUnpaid(a)"
			>
				<span class="fa-stack mr-md-1">
					<i class="fas fa-dollar-sign"></i>
					<i class="fas fa-slash fa-stack-1x"></i>
				</span>
				<span class="d-none d-md-inline">Mark as <strong>unpaid</strong></span>
			</button>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import Player from "@/components/Player.vue";
import { formatTimestamp } from "@/util.js";

export default {
	components: { Player },
	props: ["a"],
	methods: {
		...mapActions(["markAsPaid", "markAsUnpaid"]),
		formatTimestamp,
	},
};
</script>

<style>
.mark-unpaid-btn .fa-stack {
	font-size: 0.9em;
	height: unset;
	line-height: unset;
	width: 1.4em;
}
</style>


