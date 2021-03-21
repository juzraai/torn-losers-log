<template>
	<div class="my-1">
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
</template>

<script>
import { mapActions } from "vuex";

export default {
	props: ["entry"],
	methods: {
		...mapActions(["markAsPaid", "markAsUnpaid"]),
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
