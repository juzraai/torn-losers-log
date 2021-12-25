<template>
	<div class="container-fluid my-4">
		<Card>
			<div
				class="card-body"
				v-html="changelog"
			/>
		</Card>
	</div>
</template>

<script>
import { marked } from 'marked';

export default {
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
							.join('\n')
					);
				})
				.filter(line => line.trim().length)
				.join('\n')
				.split('#')[0];
			return marked(t);
		},
	},
};
</script>
