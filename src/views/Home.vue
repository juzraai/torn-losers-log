<template>
	<div>
		<input
			type="text"
			v-model="apiKeyInput"
		>
		<button @click="login(apiKeyInput)">Set API key</button>
		<h1>Hi, {{ names[playerId] }} [{{ playerId }}]!</h1>
	</div>
</template>

<script>
//import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions, mapState } from "vuex";

export default {
	name: "Home",
	components: {
		//HelloWorld
	},
	data() {
		return {
			apiKeyInput: this.$store.state.apiKey,
		};
	},
	computed: {
		...mapState(["names", "playerId"])
	},
	methods: {
		...mapActions(["login"])
	},
};
</script>
