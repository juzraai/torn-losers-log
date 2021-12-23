<template>
	<Screen
		back-label="Back to log"
		back-to="/log"
		show-back
		title="Settings"
	>
		<b-form-group label="UI">
			<b-form-group>
				<b-form-checkbox
					v-model="darkModeModel"
					name="check-button"
					switch
				>
					Dark mode
				</b-form-checkbox>
			</b-form-group>
		</b-form-group>

		<b-form-group label="Updates">
			<b-form-group>
				<b-form-checkbox
					v-model="updateOnLoadModel"
					name="check-button"
					switch
				>
					Update attacks on page load
				</b-form-checkbox>
			</b-form-group>
		</b-form-group>
	</Screen>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
	head: {
		title: 'Settings',
	},
	computed: {
		...mapState('settings', ['darkMode', 'updateOnLoad']),
		darkModeModel: {
			get() {
				return this.darkMode;
			},
			set(value) {
				this.SET_DARK_MODE(value);
			},
		},
		updateOnLoadModel: {
			get() {
				return this.updateOnLoad;
			},
			set(value) {
				this.SET_UPDATE_ON_LOAD(value);
			},
		},
	},
	beforeMount() {
		if (!this.$store.state.settings.apiKey) {
			this.$router.replace('/migrate');
		}
	},
	methods: {
		...mapMutations('settings', ['SET_DARK_MODE', 'SET_UPDATE_ON_LOAD']),
	},
};
</script>
