<template>
	<div class="bg-dark py-2 text-light">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<p>
						<strong>TORN City Losers' Log (TLL)</strong>
						<br>
						<strong>v{{ $config.APP_VERSION }}</strong>
						(released
						<Timeago
							:auto-update="60"
							:datetime="$config.BUILD_TIMESTAMP"
						/>)
					</p>
					<p>
						<i class="fab fa-github fa-fw mr-1" />
						<a
							href="https://github.com/juzraai/torn-losers-log"
							target="_blank"
						>Source code on GitHub</a>
					</p>
				</div>
				<div class="col">
					<p>
						<strong>
							Created by <a
								href="https://www.torn.com/profiles.php?XID=2413874"
								target="_blank"
							>[2413874]</a>,
						</strong>
						please feel free to contact me in game if you have any questions, issues, ideas or feature requests.
					</p>
					<p>
						In-game donations and <a
							href="https://www.torn.com/forums.php#/p=threads&f=67&t=16219540"
							target="_blank"
						>forum thread</a> upvotes are much appreciated.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		buildTime: 0,
		version: process.env.APP_VERSION,
	}),
};
</script>

<style scoped>
a {
	color: white;
	font-weight: bold;
}
</style>
