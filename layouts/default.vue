<template>
	<div
		class="d-flex flex-column transitions"
		:class="{ dark: darkMode, lite: !darkMode }"
	>
		<div class="d-flex flex-column h-full">
			<Navbar />
			<div class="flex-grow-1 py-3 py-md-5">
				<Nuxt />
			</div>
		</div>
		<Footer />
		<b-overlay
			class="position-fixed"
			no-wrap
			:show="loading"
			spinner-variant="white"
			variant="dark"
		/>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data: () => ({
		loading: true,
	}),
	computed: {
		...mapState('settings', ['darkMode']),
	},
	mounted() {
		this.$loadPreviousState();
		this.loading = false;
	},
};
</script>
