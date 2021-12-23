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
			<b-form-group>
				<b-form-checkbox
					v-model="updateIntervalMsModel"
					name="check-button"
					switch
				>
					Update attacks every minute and hide <i class="fas fa-sync fa-fw mx-1" />button
				</b-form-checkbox>
			</b-form-group>
		</b-form-group>
	</Screen>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import UPDATER from '@/services/updater';

export default {
	head: {
		title: 'Settings',
	},
	computed: {
		...mapState('settings', ['darkMode', 'updateIntervalMs', 'updateOnLoad']),
		darkModeModel: {
			get() {
				return this.darkMode;
			},
			set(value) {
				this.SET_DARK_MODE(value);
			},
		},
		updateIntervalMsModel: {
			get() {
				return !!this.updateIntervalMs; // convert to bool
			},
			set(value) {
				this.SET_UPDATE_INTERVAL_MS(value ? 60000 : 0);
				UPDATER.schedule();
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
		...mapMutations('settings', [
			'SET_DARK_MODE',
			'SET_UPDATE_INTERVAL_MS',
			'SET_UPDATE_ON_LOAD',
		]),
	},
};
</script>
