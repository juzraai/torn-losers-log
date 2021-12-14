<template>
	<div
		class="d-flex flex-column layout"
		:class="{ dark: darkMode }"
	>
		<div class="container flex-grow-1 py-5">
			<Nuxt />
		</div>
		<Footer />
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState('settings', ['darkMode']),
	},
};
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import '~/assets/variables';

.layout.dark {
	background-color: $dark-body-bg;
	color: $dark-body-color;
}
</style>
