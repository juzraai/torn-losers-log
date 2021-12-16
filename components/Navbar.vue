<template>
	<div class="align-items-start d-flex my-1">
		<NavbarButton to="/">
			TLL
		</NavbarButton>

		<client-only>
			<NavbarButton class="ml-auto" disabled>
				<Player :id="playerId" />
			</NavbarButton>
		</client-only>
		<NavbarButton @click="SET_DARK_MODE(!darkMode)">
			<i class="fas fa-lightbulb fa-fw" />
		</NavbarButton>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
	computed: {
		...mapState('settings', ['darkMode', 'playerId']),
	},
	methods: {
		...mapMutations('settings', ['SET_DARK_MODE']),
	},
};
</script>
