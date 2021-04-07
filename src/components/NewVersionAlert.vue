<template>
	<div class="row">
		<div class="col">
			<b-alert
				class="mb-4 shadow-sm"
				:show="notifiedVersion != version"
				variant="success"
			>
				<h4 class="alert-heading"><strong>TLL</strong> has just been updated to <strong>v{{ version }}</strong>!</h4>
				<hr>
				<VueMarkdown :source="changelog" />
				<hr>
				<button
					class="btn btn-success mr-3"
					@click="dismiss"
					title="Close notification"
					v-b-tooltip.hover.bottom
				>
					<i class="fas fa-fw fa-check mr-1"></i>
					Cool!
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
import { mapMutations, mapState } from "vuex";
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
	computed: {
		...mapState(["notifiedVersion"]),
	},
	methods: {
		...mapMutations(["setNotifiedVersion"]),
		dismiss() {
			this.setNotifiedVersion(this.version);
		},
	},
};
</script>
