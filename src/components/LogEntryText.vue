<template>
	<div :class="entry.paid ? 'text-muted' : null">
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
</template>

<script>
import Player from "@/components/Player.vue";

export default {
	components: { Player },
	props: ["entry"],
};
</script>
