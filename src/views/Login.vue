<template>
	<div class="row">
		<div class="col-sm-11 col-md-8 col-lg-6 col-xl-5 mx-auto">
			<Widget card-body-class="px-0">
				<div class="px-3">
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
							placeholder="API key"
							type="text"
							v-model="apiKeyInput"
						>
					</div>
					<p>The <strong>Login</strong> button will use 2 API calls to fetch your player name and your losses.</p>
				</div>

				<div class="border-top text-center pt-3">
					<button
						class="btn btn-lg btn-primary"
						:disabled="!apiKeyInput"
						@click="doLogin"
					>
					Login
					</button>
				</div>
			</Widget>
		</div>
	</div>
</template>

<script>
// TODO link to about page
import { mapActions } from "vuex";
import Widget from "@/components/Widget.vue";

export default {
	components: { Widget },
	metaInfo: {
		title: 'Login'
	},
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
			this.$router.push("/");
		},
	},
};
</script>
