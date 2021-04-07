<template>
	<div class="bg-dark text-light">
		<div class="container my-3">
			<div class="row">
				<div class="col-md-4 mb-4 mb-md-0">
					Version <router-link
						class="font-weight-bold text-white"
						to="/changelog"
					>{{ version }}</router-link>
					<br>
					Released
					<timeago
						:auto-update="60"
						class="font-weight-bold"
						:datetime="buildTime"
						v-if="buildTime"
					/>
				</div>
				<div class="col">
					Source code, license:
					<br>
					<a
						class="font-weight-bold text-white"
						href="https://github.com/juzraai/torn-losers-log"
						target="_blank"
					>GitHub</a>
				</div>
				<div class="col">
					Issues, donations:
					<br>
					<a
						class="font-weight-bold text-white"
						href="https://www.torn.com/profiles.php?XID=2413874"
						target="_blank"
					>[2413874]</a>
				</div>
			</div>
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
