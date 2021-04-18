<template>
	<div :class="entry.paid ? 'text-muted' : null">
		<span class="d-none d-md-inline mr-1">You lost</span>
		<strong
			class="mr-1"
			v-if="entry.attacks"
		>{{ entry.attacks.length }}x</strong>
		<span class="d-none d-md-inline mr-1">to</span>
		<strong
			class="d-md-none mr-1"
			role="button"
			title="Sets the price for <strong>this and all newer</strong> losses."
			v-b-tooltip.hover.left.html
			@click="doSetPrice"
		>${{ formatPrice(entry.price) }}</strong>
		<Player
			class="font-weight-bold"
			:id="entry.defender_id"
			:variant="entry.paid ? 'muted' : 'dark'"
		/>
		<span class="d-none d-md-inline mr-1">for</span>
		<strong
			class="d-none d-md-inline mr-1"
			role="button"
			title="Sets the price for <strong>this and all newer</strong> losses."
			v-b-tooltip.hover.left.html
			@click="doSetPrice"
		>${{ formatPrice(entry.price) }}</strong>
		<span v-if="entry.attacks && entry.attacks.length">
			<span class="d-md-none">=
				<strong>${{ formatPrice(entry.price * entry.attacks.length) }}</strong>
			</span>
			<span class="d-none d-md-inline">each (<strong>${{ formatPrice(entry.price * entry.attacks.length) }}</strong> total)</span>
		</span>
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
import { mapActions } from "vuex";
import Player from "@/components/Player.vue";
import { formatPrice } from "@/services/tornFormat.js";

export default {
	components: { Player },
	props: ["entry"],
	methods: {
		...mapActions(["setPrice"]),
		doSetPrice() {
			const { entry } = this;
			let price = prompt(
				"New price for this and all newer losses, in thousand TORN dollars:"
			);
			if (price === null) return;
			price = 1000 * Number(price.replace(/\D/g, ""));
			this.setPrice({ entry, price });
		},
		formatPrice,
	},
};
</script>
