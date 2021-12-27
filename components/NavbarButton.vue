<template>
	<b-button
		class="font-weight-bold mx-2"
		:disabled="disabled"
		:to="to"
		:variant="darkMode ? 'dark' : 'light'"
		@click="$emit('click')"
	>
		<slot />
	</b-button>
</template>

<script>
import { mapState } from 'vuex';

export default {
	props: {
		disabled: {
			type: String,
			default: undefined,
		},
		to: {
			type: String,
			default: undefined,
		},
	},
	computed: {
		...mapState('settings', ['darkMode']),
	},
};
</script>
