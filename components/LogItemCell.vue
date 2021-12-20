<template>
	<div
		class="align-items-center border-right d-flex gap p-2 transitions"
		:class="{ clickable, 'flex-grow-1': grow }"
		@click="$emit('click', $event)"
		@mouseenter="$emit('mouseenter', $event)"
		@mouseleave="$emit('mouseleave', $event)"
	>
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		clickable: {
			type: Boolean,
			default: false,
		},
		grow: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="scss" scoped>
.border-right:last-child {
	border: none !important;
}

.clickable {
	cursor: pointer;

	&:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}
}
</style>
