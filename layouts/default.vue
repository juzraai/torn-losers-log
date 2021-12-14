<template>
	<div
		class="d-flex flex-column transitions"
		:class="{ dark: darkMode, lite: !darkMode }"
	>
		<b-navbar :type="darkMode ? 'dark' : 'light'">
			<b-navbar-brand
				class="font-weight-bold mr-3"
				to="/"
			>
				TLL
			</b-navbar-brand>
			<b-navbar-nav class="ml-auto">
				<b-button
					class="ml-3"
					to="/settings"
					:variant="darkMode ? 'dark' : 'light'"
				>
					<i class="fas fa-cog fa-fw" />
				</b-button>
				<b-button
					class="ml-3"
					:variant="darkMode ? 'dark' : 'light'"
					@click="SET_DARK_MODE(!darkMode)"
				>
					<i class="fas fa-lightbulb fa-fw" />
				</b-button>
			</b-navbar-nav>
		</b-navbar>
		<div class="flex-grow-1 py-5">
			<Nuxt />
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
import { mapMutations, mapState } from 'vuex';

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
	methods: {
		...mapMutations('settings', ['SET_DARK_MODE']),
	},
};
</script>
