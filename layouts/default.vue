<template>
	<div
		class="d-flex flex-column transitions"
		:class="{ dark: darkMode, lite: !darkMode }"
	>
		<div class="d-flex flex-column h-full">
			<Navbar />
			<div class="flex-grow-1 py-3 py-md-4">
				<Nuxt />
			</div>
		</div>
		<Footer />
		<b-overlay
			class="position-fixed"
			no-fade
			no-wrap
			:show="loading"
			spinner-variant="white"
			variant="dark"
		/>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
	computed: {
		...mapState('settings', ['darkMode']),
		...mapState('ui', ['loading']),
	},
	beforeCreate() {
		if (this.$loadPreviousState) {
			this.$loadPreviousState();
		}
	},
	mounted() {
		this.SET_LOADING(false);
	},
	methods: {
		...mapMutations('ui', ['SET_LOADING']),
	},
};
</script>
