<template>
	<div class="bg-dark py-3 text-light">
		<div class="container">
			<div class="row">
				<div class="col-4 col-md-6">
					<ul class="list-unstyled">
						<li><a href="#">Log</a></li>
						<li><a href="#">Settings</a></li>
						<li>
							<a
								href="https://github.com/juzraai/torn-losers-log/blob/main/README.md"
								target="_blank"
							>About</a>
						</li>
						<li>
							<a
								href="https://www.torn.com/forums.php#/p=threads&f=67&t=16219540"
								target="_blank"
							>Forum thread</a>
						</li>
						<li><a href="#">Changelog</a></li>
						<li>
							<a
								href="https://github.com/juzraai/torn-losers-log"
								target="_blank"
							>Source code</a>
						</li>
					</ul>
				</div>
				<div class="col">
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
						<a
							href="https://www.torn.com/profiles.php?XID=2413874"
							target="_blank"
						>Created by [2413874]</a>,
						please feel free to contact me in game if you have any questions, issues, ideas or feature requests.
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

<style lang="scss" scoped>
a {
	color: white;
	font-weight: bold;
}

ul > li {
	padding: 0.25rem 0;

	> a {
		font-weight: normal;
	}
}
</style>
