<template>
	<span :class="attacks[0].paid ? 'text-success' : 'text-danger'">
		<span v-if="attacks[0].price">
			<strong>$&nbsp;{{ $price(attacks[0].price * attacks.length) }}</strong>
			<br class="d-none d-md-inline">
			<span class="d-none d-sm-inline">
				({{ $price(attacks[0].price) }}/ea)
			</span>
		</span>
		<span
			v-else
			v-b-tooltip.bottom
			title="No price set"
		>
			{{ attacks[0].paid ? 'Paid' : 'Unpaid' }}
		</span>
	</span>
</template>

<script>
export default {
	props: {
		attacks: {
			type: Array,
			default: () => [{ paid: false, price: 0 }],
		},
	},
};
</script>
