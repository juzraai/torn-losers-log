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
				switch
			>
				Dark mode
			</b-form-checkbox>
		</b-form-group>
		<b-form-group>
			<b-form-checkbox
				v-model="listLimitModel"
				switch
			>
				Show 20 list items by default instead of 10
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
		<b-form-group>
			<b-form-checkbox
				v-model="nameResolverIntervalMsModel"
				switch
			>
				Resolve player names in the background (one name every 5 seconds)
				<br>
				<small>You should turn this on <strong>only if</strong> you see a player ID without a name in the attack list. If you update your attacks regularly, you won't need to use this feature.</small>
			</b-form-checkbox>
		</b-form-group>

		<h6>API key</h6>
		<client-only>
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
					please follow these steps: <strong>Export</strong> > <strong>Clear</strong> > enter new API key > <strong>Import</strong>.
				</template>
			</b-form-group>
		</client-only>

		<h6>TLL data</h6>
		<div class="d-flex flex-column gap">
			<SettingsButtonSection
				class="mb-3 mb-sm-0"
				icon="fas fa-file-download"
				label="Export"
				@click="exportData"
			>
				Download your settings and attacks in a single file.
				Your API key won't be included in the file.
			</SettingsButtonSection>
			<SettingsButtonSection
				class="mb-3 mb-sm-0"
				icon="fas fa-file-upload"
				label="Import"
				variant="danger"
				@click="importData"
			>
				<strong class="text-danger">Erase current settings and attacks, and restore data from an uploaded export.</strong>
			</SettingsButtonSection>
			<SettingsButtonSection
				class="align-items-center"
				icon="fas fa-trash-alt"
				label="Clear"
				variant="danger"
				@click="clearData"
			>
				<strong class="text-danger">Erase TLL data from your browser.</strong>
			</SettingsButtonSection>
		</div>
	</Screen>
</template>

<script>
import dayjs from 'dayjs';
import { mapMutations, mapState } from 'vuex';
import DB from '@/services/database';
import NAME_RESOLVER from '@/services/name-resolver';
import UPDATER from '@/services/updater';
import v1Compat from '@/services/v1-compat';

export default {
	head: {
		title: 'Settings',
	},
	computed: {
		...mapState('settings', [
			'apiKey',
			'darkMode',
			'listLimit',
			'nameResolverIntervalMs',
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
		listLimitModel: {
			get() {
				return this.listLimit === 20;
			},
			set(value) {
				this.SET_LIST_LIMIT(value ? 20 : 10);
			},
		},
		nameResolverIntervalMsModel: {
			get() {
				return !!this.nameResolverIntervalMs; // convert to bool
			},
			set(value) {
				this.SET_NAME_RESOLVER_INTERVAL_MS(value ? 5000 : 0);
				NAME_RESOLVER.schedule();
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
			'SET_LIST_LIMIT',
			'SET_NAME_RESOLVER_INTERVAL_MS',
			'SET_UPDATE_INTERVAL_MS',
			'SET_UPDATE_ON_LOAD',
		]),
		...mapMutations('ui', ['SET_LOADING']),
		async exportData() {
			const store = this.$exportState();
			const database = await DB.dump();
			delete store.settings.apiKey;

			const ts = dayjs().format('YYMMDD-HHmmss');
			const json = JSON.stringify({ store, database });
			const blob = new Blob([json], { type: 'text/plain' });
			const file = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.setAttribute('download', `tll-export-${ts}.json`);
			a.setAttribute('href', file);
			a.click();
		},
		importData() {
			const i = document.createElement('input');
			i.setAttribute('type', 'file');
			i.addEventListener('change', inputEvent => {
				const [file] = inputEvent.target.files;
				const reader = new FileReader();
				reader.addEventListener('load', async _ => {
					let data = JSON.parse(reader.result);
					if (!data.store && !data.database) {
						data = v1Compat.convert(data);
					}
					delete data.store.settings.apiKey;

					if (data.store.settings.playerId !== this.playerId) {
						return alert("playerId mismatch! This is someone else's export!");
					}

					this.SET_LOADING(true);
					this.$loadPreviousState(data.store);
					await DB.deleteRecords();
					await DB.loadDump(data.database);
					this.SET_LOADING(false);
				});
				reader.readAsText(file);
			});
			i.click();
		},
		async clearData() {
			const q = 'Are you sure you wish to erase TLL data from your browser?';
			if (confirm(q)) {
				this.$removeStorageEntry();
				await DB.deleteDatabase();
				window.location.reload();
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
