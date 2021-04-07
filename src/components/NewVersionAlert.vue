<template>
	<div class="row mb-4">
		<div class="col">
			<b-alert
				class="shadow-sm"
				show
				variant="success"
			>
				<h4 class="alert-heading"><strong>TLL</strong> has just been updated to <strong>v{{ version }}</strong>!</h4>
				<hr>
				<VueMarkdown :source="changelog" />
				<hr>
				<button class="btn btn-success mr-3">
					<i class="fas fa-fw fa-times mr-1"></i>
					Close
				</button>
				<router-link
					class="btn btn-outline-success"
					to="/changelog"
				>
					<i class="fas fa-fw fa-clipboard-list mr-1"></i>
					Full changelog
				</router-link>
			</b-alert>
		</div>
	</div>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
	components: {
		VueMarkdown,
	},
	data() {
		return {
			version: APP_VERSION,
			changelog: CHANGELOG.split("\n")
				.slice(5)
				.map((line) => {
					if (line.startsWith("#")) {
						if (line.match(/\d/)) {
							return line.replace(/^#+/, "#").replace(/\[|\]\(.*?\)/g, "");
						} else {
							return "";
						}
					}
					return line.split("([")[0].trim();
				})
				.filter((line) => line.trim().length)
				.join("\n")
				.split("#")[0],
		};
	},
};
</script>
