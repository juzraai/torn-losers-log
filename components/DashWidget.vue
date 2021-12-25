<template>
	<Card>
		<div class="card-body d-flex flex-column">
			<h6
				v-if="title"
				v-text="title"
			/>
			<slot />
		</div>
	</Card>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '',
		},
	},
};
</script>
