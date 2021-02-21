<template>
	<div>
		<input
			type="text"
			v-model="apiKeyInput"
		>
		<button @click="setApiKey(apiKeyInput)">Set API key</button>
	</div>
</template>

<script>
//import HelloWorld from '@/components/HelloWorld.vue'
import { mapMutations } from "vuex";

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
	methods: {
		...mapMutations(["setApiKey"]),
	},
};
</script>
