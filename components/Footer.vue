<template>
	<div>
		<p>
			v{{ $config.APP_VERSION }}
			(released
			<Timeago
				:auto-update="60"
				:datetime="$config.BUILD_TIMESTAMP"
			/>)
		</p>
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
