<template>
	<div class="bg-dark text-white">
		<div class="container my-3">
			<p class="text-center">
			Version {{ version }}

			<span class="d-none d-md-inline mx-3">&middot;</span>
			<br class="d-md-none">

			Released
			<timeago
				:auto-update="60"
				:datetime="buildTime"
				v-if="buildTime"
			/>

			<span class="d-none d-md-inline mx-3">&middot;</span>
			<br class="d-md-none">

			Source code, license:
			<a
				class="font-weight-bold text-white"
				href="https://github.com/juzraai/torn-losers-log"
				target="_blank"
			>GitHub</a>

			<span class="d-none d-md-inline mx-3">&middot;</span>
			<br class="d-md-none">

			Issues, donations:
			<a
				class="font-weight-bold text-white"
				href="https://www.torn.com/profiles.php?XID=2413874"
				target="_blank"
			>[2413874]</a>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			buildTime: null,
			version: APP_VERSION,
		};
	},
	mounted() {
		const t =
			document
				.getElementsByTagName("html")[0]
				.getAttribute("data-build-timestamp") || 0;
		this.buildTime = Number(t);
	},
};
</script>

<style scoped>
dt {
	margin-bottom: 1rem;
}
</style>
