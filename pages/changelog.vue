<template>
	<Screen
		show-back
		title="Changelog"
	>
		<div v-html="changelog" />
		<template #footer>
			<b-button
				class="mx-auto"
				href="https://github.com/juzraai/torn-losers-log/blob/main/CHANGELOG.md"
				target="_blank"
				variant="link"
			>
				View on GitHub
			</b-button>
		</template>
	</Screen>
</template>

<script>
import { marked } from 'marked';

export default {
	head: {
		title: 'Changelog',
	},
	computed: {
		changelog() {
			const t = this.$config.CHANGELOG
				// remove breaking change section
				.replace(/### ⚠.+?###/gs, '###')
				// remove headers
				.split('\n')
				.slice(4)
				.map(line => {
					if (line.startsWith('#')) {
						if (line.match(/\d/)) {
							// version heading
							return `<h3 class="border-bottom mt-5">${line
								.replace(/^#+/, '')
								.replace(/\[|\]\(.*?\)/g, '')}</h3>`;
						} else {
							// category subheading
							return `<h6 class="mt-4 px-1">${line
								.replace(/^#+/, '')
								.trim()}</h6>`;
						}
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
				.join('\n');
			return marked(t);
		},
	},
};
</script>
