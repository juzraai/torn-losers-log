<template>
	<div>
		<big>{{ attacks.length }}</big>
		{{ attacks }}
	</div>
</template>

<script>
export default {
	props: {
		attacks: {
			type: Array,
			default: () => [],
		},
	},
};
</script>
