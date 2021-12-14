<template>
	<div
		class="d-flex flex-column transitions"
		:class="{ dark: darkMode }"
	>
		<div class="container flex-grow-1 py-5">
			<Nuxt />
		</div>
		<Footer />
		<b-overlay
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
