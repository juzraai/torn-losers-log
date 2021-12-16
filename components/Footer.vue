<template>
	<div class="bg-dark mt-3 text-light">
		<div class="border-top container my-3 py-3">
			<div class="row">
				<div class="col-sm-4 col-md-6">
					<p class="d-sm-none font-weight-bold">
						<NuxtLink to="/">TLL (TORN City Losers' Log)</NuxtLink>
					</p>
					<ul class="d-flex d-sm-block flex-wrap list-unstyled">
						<li
							v-for="a in links"
							:key="a.label"
							class="mb-3 mb-sm-2 mr-3 mr-sm-0"
						>
							<NuxtLink
								v-if="a.to"
								class="font-weight-normal"
								:to="a.to || ''"
							>
								{{ a.label }}
							</NuxtLink>
							<a
								v-else
								class="font-weight-normal"
								:href="a.href || '#'"
								:target="a.target"
							>{{ a.label }}</a>
						</li>
					</ul>
				</div>
				<div class="col">
					<p class="d-none d-sm-block font-weight-bold">
						<NuxtLink to="/">TLL (TORN City Losers' Log)</NuxtLink>
					</p>
					<p class="text-justify">
						Created and being developed by
						<a
							href="https://www.torn.com/profiles.php?XID=2413874"
							target="_blank"
						>[2413874]</a>.
						Please feel free to contact me in game if you have any questions, issues, ideas or feature requests.
						In-game donations and <a
							href="https://www.torn.com/forums.php#/p=threads&f=67&t=16219540"
							target="_blank"
						>forum thread</a> upvotes are much appreciated.
					</p>
					<p class="text-secondary">
						<span class="badge badge-light mr-2">v{{ $config.APP_VERSION }}</span>
						Built
						<Timeago
							:auto-update="60"
							:datetime="$config.BUILD_TIMESTAMP"
						/>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		links: [
			{ label: 'Log', to: '/log' },
			{
				label: 'About',
				href: 'https://github.com/juzraai/torn-losers-log/blob/main/README.md',
				target: '_blank',
			},
			{
				label: 'Forum thread',
				href: 'https://www.torn.com/forums.php#/p=threads&f=67&t=16219540',
				target: '_blank',
			},
			{ label: 'Changelog' },
			{
				label: 'Source code',

				href: 'https://github.com/juzraai/torn-losers-log',
				target: '_blank',
			},
		],
		buildTime: 0,
		version: process.env.APP_VERSION,
	}),
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

a {
	color: white !important;
	font-weight: bold;
}

p {
	color: $gray-400;
}

.lite .border-top {
	border-color: transparent !important;
}
</style>
