<template>
	<div class="container-fluid">
		<div class="row">
			<div class="bg-info col-lg-3 mb-4 mb-lg-0">
				filters
			</div>
			<div class="col">
				log
			</div>
		</div>
	</div>
</template>

<script>
export default {
	beforeMount() {
		if (!this.$store.state.settings.apiKey) {
			this.$router.push('/connect');
		}
	},
};
</script>
