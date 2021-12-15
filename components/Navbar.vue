<template>
	<b-navbar :type="darkMode ? 'dark' : 'light'">
		<b-navbar-nav>
			<b-button
				class="font-weight-bold mr-3"
				to="/"
				:variant="darkMode ? 'dark' : 'light'"
			>
				TLL
			</b-button>
		</b-navbar-nav>
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
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
	computed: {
		...mapState('settings', ['darkMode']),
	},
	methods: {
		...mapMutations('settings', ['SET_DARK_MODE']),
	},
};
</script>
