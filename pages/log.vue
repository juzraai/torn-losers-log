<template>
	<div class="container-fluid">
		<div class="d-flex flex-column flex-lg-row gap">
			<div>
				<client-only>
					<div class="d-flex flex-wrap gap">
						<LogRefresh />
						<LogFilters />
					</div>
				</client-only>
			</div>
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
