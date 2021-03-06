<template>
	<div>
		<!--
			<input
			type="text"
			v-model="apiKeyInput"
		>
		<button @click="login(apiKeyInput)">Set API key</button>
		<h1>Hi, {{ names[playerId] }} [{{ playerId }}]!</h1>
		-->
		<ul class="list-group">
			<li class="list-group-item">Cras justo odio</li>
			<li class="list-group-item">Dapibus ac facilisis in</li>
			<li class="list-group-item">Morbi leo risus</li>
			<li class="list-group-item">Porta ac consectetur ac</li>
			<li class="list-group-item">Vestibulum at eros</li>
		</ul>
		<div>
			left: items per page settings
			right: prev/next btns
		</div>
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
		...mapState(["names", "playerId"]),
	},
	methods: {
		...mapActions(["login"]),
	},
};
</script>
