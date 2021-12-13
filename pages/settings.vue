<template>
	<div class="card shadow">
		<div class="card-body">
			<h1>Settings</h1>
			<p>darkMode = {{ darkMode }}</p>
			<b-button @click="SET_DARK_MODE(!darkMode)">toggle</b-button>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
	computed: {
		...mapState('settings', ['darkMode']),
	},
	methods: {
		...mapMutations('settings', ['SET_DARK_MODE']),
	},
};
</script>
