<template>
	<Screen
		back-label="Back to log"
		back-to="/log"
		show-back
		title="Settings"
	>
		<h6>UI</h6>
		<b-form-group>
			<b-form-checkbox
				v-model="darkModeModel"
				name="check-button"
				switch
			>
				Dark mode
			</b-form-checkbox>
		</b-form-group>

		<h6>Updates</h6>
		<b-form-group>
			<b-form-checkbox
				v-model="updateOnLoadModel"
				switch
			>
				Update attacks on page load
			</b-form-checkbox>
		</b-form-group>
		<b-form-group>
			<b-form-checkbox
				v-model="updateIntervalMsModel"
				switch
			>
				Update attacks every minute and hide <i class="fas fa-sync fa-fw mx-1" />button
			</b-form-checkbox>
		</b-form-group>

		<h6>API key</h6>
		<b-form-group>
			<template #label>
				TLL is bound to
				<Player
					class="font-weight-bold"
					:xid="playerId"
				/>
				via this API key:
			</template>
			<b-form-input
				disabled
				readonly
				:value="apiKey.substr(0, 5) + '...'"
			/>
			<template #description>
				If you wish to change the API key or switch to another player,
				please use the <strong>Export</strong> and <strong>Clear</strong>
				buttons below, then you can enter a new API key.
			</template>
		</b-form-group>

		<h6>TLL data</h6>
		<b-form-group label="You can download your settings and attacks in a single file, as a complete TLL backup.">
			<b-button
				variant="primary"
				@click="exportData"
			>
				<i class="fas fa-file-download fa-fw mr-1" />
				Export
			</b-button>
		</b-form-group>
		<b-form-group description="You can use exports of TLL v1 too.">
			<template #label>
				You can upload a previously downloaded export, to restore a backup. <strong class="text-danger">This will delete your current settings and database first!</strong>
			</template>
			<b-button
				variant="danger"
				@click="exportData"
			>
				<i class="fas fa-file-upload fa-fw mr-1" />
				Import
			</b-button>
		</b-form-group>
		<b-form-group label="You can erase TLL data from your browser. The following button will ask for confirmation first.">
			<b-button
				variant="danger"
				@click="clearData"
			>
				<i class="fas fa-trash-alt fa-fw mr-1" />
				Clear
			</b-button>
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
		...mapState('settings', [
			'apiKey',
			'darkMode',
			'playerId',
			'updateIntervalMs',
			'updateOnLoad',
		]),
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
		exportData() {
			// TODO build { store: {}, database: {} } JSON
			// TODO make it download
		},
		importData() {
			// TODO create a file input element, click it
			// TODO read it
			// TODO run $eraseData(true) & DB.delete(true)
			// TODO import stuff into LS & db (names, 4 attack tables)
			// TODO support V1 too!
		},
		clearData() {
			if (confirm('Are you sure you wish to erase TLL data from your browser?')) {
				// TODO call $eraseData(true) - defined in storage.client.js (should just remove from LS)
				// TODO call  DB.delete(true) - defined in database.js (should call db.delete())
				// TODO router push /
			}
		},
	},
};
</script>

<style scoped>
h6 {
	font-weight: bold;
	margin-top: 2rem;
}
</style>
