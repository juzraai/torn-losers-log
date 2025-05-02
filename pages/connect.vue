<template>
	<Screen
		show-back
		title="Connect to TORN"
	>
		<b-form-group label="Please enter your API key:">
			<b-form-input
				ref="apiKeyInput"
				v-model.trim="apiKeyInput"
				class="text-center"
				placeholder="Click to paste"
				size="lg"
				@click="pasteApiKey"
			/>
		</b-form-group>

		<p class="text-justify">
			You can find your API key(s) in your <a
				href="https://www.torn.com/preferences.php#tab=api"
				target="_blank"
			>TORN settings</a>.
			<strong>TLL</strong> needs a key with <span class="font-weight-bold text-warning">Limited access</span>, you can create one using the link below.
		</p>

		<template #footer>
			<b-button
				href="https://www.torn.com/preferences.php#tab=api?&step=addNewKey&title=TLL&type=3"
				target="_blank"
				variant="link"
			>
				<i class="fas fa-plus mr-1" />
				New key
			</b-button>
			<b-button
				:disabled="!isValidApiKey(apiKeyInput)"
				variant="primary"
				@click="connect"
			>
				Log
				<i class="fas fa-sign-in-alt ml-1" />
			</b-button>
		</template>
	</Screen>
</template>

<script>
import { mapMutations } from 'vuex';
import DB from '@/services/database';
import TORN from '@/services/torn';
import UPDATER from '@/services/updater';

export default {
	data: () => ({
		apiKeyInput: '',
	}),
	head: {
		title: 'Connect to TORN',
	},
	beforeMount() {
		if (this.$store.state.settings.apiKey) {
			this.$router.replace('/log');
		}
	},
	mounted() {
		this.$refs.apiKeyInput?.focus();
	},
	methods: {
		...mapMutations('settings', ['SET_API_KEY', 'SET_PLAYER_ID']),
		...mapMutations('ui', ['SET_LOADING']),
		async pasteApiKey() {
			if (this.apiKeyInput.length === 0) {
				try {
					const apiKey = await navigator.clipboard.readText();
					if (this.isValidApiKey(apiKey)) {
						this.apiKeyInput = apiKey;
					}
				} catch {}
			}
		},
		isValidApiKey(apiKey) {
			return apiKey.match(/[0-9A-Za-z]{16}/);
		},
		async connect() {
			try {
				this.SET_LOADING(true);
				const basic = await TORN.basic(this.apiKeyInput);
				if (!basic.player_id || !basic.name) {
					throw new Error('Invalid response or API key.');
				}

				this.SET_API_KEY(this.apiKeyInput);
				this.SET_PLAYER_ID(basic.player_id);

				await DB.addPlayers([
					{
						id: basic.player_id,
						name: basic.name,
					},
				]);

				if (!await UPDATER.updateAttacks()) {
					this.errorToast('TORN API returned no attacks. See developer console (F12 -> Console tab) for error message.');
				}

				this.$router.push('/log');
			} catch (error) {
				this.apiKeyInput = '';
				if (error.message) {
					this.errorToast(error.message);
				} else {
					throw error;
				}
			} finally {
				this.SET_LOADING(false);
			}
		},
	},
};
</script>
