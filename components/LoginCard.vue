<template>
	<div class="card shadow">
		<div class="card-body">
			<b-form-group
				class="mb-4"
				label="Workin?"
			>
				<template #label>
					<strong>To get started, please enter a TORN API key with <span class="text-warning">Limited access</span>:</strong>
				</template>
				<b-form-input
					ref="apiKeyInput"
					v-model.trim="apiKeyInput"
					class="text-center"
					placeholder="Click to paste"
					size="lg"
					@click="pasteApiKey"
				/>
			</b-form-group>

			<div v-if="!isValidApiKey(apiKeyInput)">
				<p class="text-justify">You can find your API key(s) in your TORN settings, from where you can copy a key with a single click. The buttons below can take you to the Settings page, the second button will even create a new API key for you with sufficient permissions for TLL.</p>
				<div class="d-flex justify-content-between">
					<b-button
						href="https://www.torn.com/preferences.php#tab=api"
						target="_blank"
						variant="primary"
					>
						<i class="fas fa-cog mr-1" />
						Settings
					</b-button>
					<b-button
						href="https://www.torn.com/preferences.php#tab=api?&step=addNewKey&title=TLL&type=3"
						target="_blank"
						variant="success"
					>
						<i class="fas fa-plus mr-1" />
						New key
					</b-button>
				</div>
			</div>
			<div
				v-else
				class="text-center"
			>
				<b-button
					size="lg"
					variant="primary"
					@click="login"
				>
					<i class="fas fa-sign-in-alt mr-1" />
					Enter
				</b-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		apiKeyInput: '',
	}),
	mounted() {
		this.$refs.apiKeyInput?.focus();
	},
	methods: {
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
		login() {
			// TODO loading:=true, fetch basic info
			// TODO if somethings wrong, alert user, remove api key
		}
	},
};
</script>
