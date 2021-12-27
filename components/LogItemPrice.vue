<template>
	<span :class="attacks[0].paid ? 'text-success' : 'text-danger'">
		<span v-if="attacks[0].price">
			<strong>$&nbsp;{{ censored ? 'xxxM' : $price(attacks[0].price * attacks.length) }}</strong>
			<span v-if="attacks.length > 1">
				<br class="d-none d-md-inline">
				<span class="d-none d-sm-inline">
					({{ censored ? 'xxxk' : $price(attacks[0].price) }}/ea)
				</span>
			</span>
		</span>
		<span v-else>
			<span class="d-md-none">{{ attacks[0].paid ? 'Paid' : 'Unpaid' }}</span>
			<span class="d-none d-sm-inline small">(no price set)</span>
		</span>
	</span>
</template>

<script>
import { mapState } from 'vuex';

export default {
	props: {
		attacks: {
			type: Array,
			default: () => [{ paid: false, price: 0 }],
		},
	},
	computed: {
		...mapState('ui', ['censored']),
	},
};
</script>
