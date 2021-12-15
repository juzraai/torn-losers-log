<template>
	<Screen title="Welcome to TLL!">
		<p><strong>TLL</strong> aims to help you with loss selling or buying. It can</p>
		<ul class="list-unstyled mb-md-4 ml-3">
			<li
				v-for="f in features"
				:key="f.texts[0]"
				class="d-flex align-items-center mb-sm-3"
			>
				<div>
					<i
						class="fa-fw mr-2"
						:class="f.icons[0]"
					/>
					<br class="d-sm-none">
					<i
						class="fa-fw mr-3"
						:class="f.icons[1]"
					/>
				</div>
				<div>
					<span v-html="f.texts[0]" />
					<br class="d-sm-none">
					<span v-html="f.texts[1]" />
				</div>
			</li>
		</ul>
		<template #footer>
			<b-button
				href="https://github.com/juzraai/torn-losers-log/blob/main/README.md"
				target="_blank"
				variant="link"
			>
				Read more
			</b-button>
			<b-button
				variant="primary"
				@click="start"
			>
				Start
				<i class="fas fa-sign-in-alt fa-fw ml-1" />
			</b-button>
		</template>
	</Screen>
</template>

<script>
export default {
	data: () => ({
		features: [
			{
				icons: ['fas fa-list', 'far fa-chart-bar'],
				texts: ['list, filter, group,', 'count, plot,'],
			},
			{
				icons: ['fas fa-tag', 'fas fa-check'],
				texts: ['store price', 'and paid status'],
			},
			{
				icons: ['fas fa-skull', 'fas fa-running'],
				texts: [
					'of losses',
					'<strong>and escapes</strong><span class="badge badge-success ml-2">NEW!</span>',
				],
			},
			{
				icons: ['fas fa-crosshairs', 'fas fa-shield-alt'],
				texts: [
					'you made',
					'<strong>or received!</strong><span class="badge badge-success ml-2">NEW!</span>',
				],
			},
		],
	}),
	head: {
		title: 'Welcome!',
	},
	methods: {
		start() {
			// TODO if v1 not imported yet -> /migrate
			// TODO if no API key in store -> /login
			// TODO else -> /log

			this.$router.push('/connect');
		},
	},
};
</script>
