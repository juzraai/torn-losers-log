<template>
	<Screen>
		<h5 class="font-weight-bold mb-4">
			<i class="fas fa-bullhorn mr-2" />
			TLL has been updated to v{{ $config.APP_VERSION }}
		</h5>
		<div v-html="changelog" />
		<template #footer>
			<b-button
				to="/changelog"
				variant="link"
			>
				Full changelog
			</b-button>
			<b-button
				to="/"
				variant="primary"
			>
				Cheers!
				<i class="fas fa-glass-cheers ml-1" />
			</b-button>
		</template>
	</Screen>
</template>

<script>
import { marked } from 'marked';
import { mapMutations } from 'vuex';

export default {
	data: () => ({
		show: true,
	}),
	computed: {
		changelog() {
			const t = this.$config.CHANGELOG.split('\n')
				.slice(5)
				.map(line => {
					if (line.startsWith('#')) {
						// we only need to mark version headings
						// we'll split the whole thing at the first one
						return line.match(/\d/) ? '#' : '';
					}
					return (
						line
							// remove commit hash
							.split('([')[0]
							.trim()
							// make major commit message multiline
							.split('; ')
							.join('\n* ')
					);
				})
				.filter(line => line.trim().length)
				.join('\n')
				.split('#')[0];
			return marked(t);
		},
	},
	mounted() {
		this.SET_ANNOUNCED_VERSION(this.$config.APP_VERSION);
	},
	methods: {
		...mapMutations('settings', ['SET_ANNOUNCED_VERSION']),
	},
};
</script>
