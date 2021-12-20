<template>
	<LogItemCell
		v-b-tooltip.html.left
		class="lead paid-button px-lg-3"
		clickable
		:title="tooltip"
		@click="$emit('click', $event)"
		@mouseenter="hover = true"
		@mouseleave="hover = false"
	>
		<i
			v-if="(attacks[0].paid && !hover) || (!attacks[0].paid && hover)"
			class="fas fa-check fa-fw text-success"
		/>
		<i
			v-if="(!attacks[0].paid && !hover) || (attacks[0].paid && hover)"
			class="fas fa-times fa-fw text-danger"
		/>
	</LogItemCell>
</template>

<script>
export default {
	props: {
		attacks: {
			type: Array,
			default: () => [{ paid: false, price: 0 }],
		},
	},
	data: () => ({
		hover: false,
	}),
	computed: {
		tooltip() {
			return this.attacks[0].paid
				? 'Mark this and newer attacks<br>of this player as <strong class="text-danger">unpaid</strong>'
				: 'Mark this and older attacks<br>of this player as <strong class="text-success">paid</strong>';
		},
	},
};
</script>

<style scoped>
</style>
