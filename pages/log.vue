<template>
	<div class="container-fluid">
		<div class="d-flex flex-column flex-lg-row gap">
			<div class="mb-4 mb-lg-0">
				<RoleFilter />
			</div>
			<div class="flex-grow-1">
				<LogList />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	head: {
		title: 'Log',
	},
	beforeMount() {
		if (!this.$store.state.settings.apiKey) {
			this.$router.replace('/migrate');
		}
	},
};
</script>

<style scoped>
.gap {
	gap: 1rem;
}
</style>
