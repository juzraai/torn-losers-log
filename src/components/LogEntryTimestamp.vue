<template>
	<div
		title="Toggle proof"
		v-b-tooltip.hover.left
	>
		<div
			class="align-items-center d-none d-md-flex log-entry-timestamp mr-3 small text-primary"
			:class="dark ? 'text-light' : 'text-primary'"
			v-b-toggle="proofBoxId"
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
			v-b-toggle="proofBoxId"
		>
			<i class="fas fa-fw fa-clipboard-list"></i>
		</button>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { formatTimestamp } from "@/services/tornFormat.js";

export default {
	props: ["entry", "proofBoxId"],
	computed: {
		...mapState(["dark"]),
	},
	methods: {
		formatTimestamp,
	},
};
</script>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

.log-entry-timestamp {
	min-height: 32px;
	outline: none;

	@include media-breakpoint-up(md) {
		width: 130px;
	}
}
</style>
