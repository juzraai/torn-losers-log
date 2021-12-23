<template>
	<div class="row">
		<div class="col-12 col-sm-8 col-md-9 mb-3 mb-md-0 text-justify">
			<slot />
		</div>
		<div class="col-auto col-sm-4 col-md-3">
			<b-button
				block
				:variant="variant"
				@click="$emit('click', $event)"
			>
				<i class="fa-fw mr-1" :class="icon" />
				{{ label }}
			</b-button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			default: 'fas fa-cog',
		},
		label: {
			type: String,
			default: '',
		},
		variant: {
			type: String,
			default: 'primary',
		},
	},
};
</script>
