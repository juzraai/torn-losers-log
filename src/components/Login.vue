<template>
	<div class="col-sm-10 col-md-8 col-lg-6 mx-auto">
		<div class="card">
			<div class="card-body">
				<p>
					Please provide your TORN City
					<a
						href="https://www.torn.com/preferences.php#tab=api"
						target="_blank"
					>API key</a>
					below!
				</p>
				<div class="form-group">
					<input
						class="form-control form-control-lg"
						type="text"
						placeholder="API key"
						v-model="apiKeyInput"
					>
				</div>
				<p>The <strong>Login</strong> button will use 2 API calls to fetch your player name and your losses.</p>
			</div>
			<div class="card-footer text-right">
				<button
					class="btn btn-primary"
					:disabled="!apiKeyInput"
					@click="doLogin"
				>Login</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
	data() {
		return {
			apiKeyInput: this.$store.state.apiKey,
		};
	},
	methods: {
		...mapActions(["fetchLosses", "login"]),
		async doLogin() {
			await this.login(this.apiKeyInput);
			await this.fetchLosses();
		},
	},
};
</script>
