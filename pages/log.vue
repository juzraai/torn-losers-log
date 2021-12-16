<template>
	<div class="container-fluid">
		<div class="d-flex flex-column flex-lg-row gap">
			<client-only>
				<div class="d-flex flex-row flex-lg-column gap">
					<LogRefresh />
					<LogFilters />
				</div>
			</client-only>
			<div class="flex-grow-1">
				<client-only>
					<LogList />
				</client-only>
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
