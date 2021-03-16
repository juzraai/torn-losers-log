<template>
	<div class="list-group-item px-2 py-1">
		<div
			class="align-items-center d-flex"
			:class="entry.paid ? 'text-muted' : null"
		>
			<div
				class="align-items-center d-none d-md-flex mr-3 small text-primary timestamps"
				v-b-toggle="toggleId"
			>
				<div>
					{{ formatTimestamp(entry.timestamp_ended) }}
					<span v-if="entry.timestamp_started">
						<br>
						{{ formatTimestamp(entry.timestamp_started) }}
					</span>
				</div>
			</div>
			<button
				class="btn btn-sm btn-outline-primary d-md-none mr-3"
				v-b-toggle="toggleId"
			>
				<i class="fas fa-fw fa-clipboard-list"></i>
			</button>

			<div>
				<span class="d-none d-md-inline mr-1">You lost</span>
				<strong
					class="mr-1"
					v-if="entry.attacks"
				>{{ entry.attacks.length }}x</strong>
				<span class="d-none d-md-inline mr-1">to</span>
				<Player
					class="font-weight-bold"
					:id="entry.defender_id"
					:variant="entry.paid ? 'muted' : 'dark'"
				/>
				<span
					class="badge alert-success ml-2 px-2"
					v-if="entry.paid"
				>paid</span>
				<span
					class="badge badge-danger ml-2 px-2"
					:title="entry.attacks ? 'This is the oldest loss group in the log. It\'s probably incomplete and may decrease/disappear with the next refresh.' : 'This is the oldest loss in the log. It may disappear with the next refresh.'"
					v-b-tooltip.hover.bottom
					v-if="entry.oldest"
				>oldest</span>
			</div>
			<div class="ml-auto my-1">
				<button
					class="btn btn-sm btn-outline-success"
					title="Marks this and all previous losses to this client as <strong>paid</strong>"
					v-b-tooltip.hover.left.html
					v-if="!entry.paid"
					@click="markAsPaid(entry)"
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
					@click="markAsUnpaid(entry)"
				>
					<span class="fa-stack mr-md-1">
						<i class="fas fa-dollar-sign"></i>
						<i class="fas fa-slash fa-stack-1x"></i>
					</span>
					<span class="d-none d-md-inline">Mark as <strong>unpaid</strong></span>
				</button>
			</div>
		</div>
		<b-collapse :id="toggleId">
			<ProofBox :entry="entry" />
		</b-collapse>
	</div>
</template>

<script>
// TODO move out components: LogEntryTimestamp, LogEntryText, LogEntryButtons
import { mapActions, mapState } from "vuex";
import Player from "@/components/Player.vue";
import ProofBox from "@/components/ProofBox.vue";
import { formatTimestamp } from "@/util.js";

export default {
	components: { Player, ProofBox },
	props: ["entry"],
	computed: {
		...mapState(["tab"]),
		toggleId() {
			return this.entry.code || this.entry.attacks[0].code
		}
	},
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

.timestamps {
	min-height: 32px;
	outline: none;
}
</style>


