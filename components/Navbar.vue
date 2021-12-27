<template>
	<div class="align-items-start d-flex my-1">
		<NavbarButton
			class="mr-auto"
			to="/"
		>
			TLL
		</NavbarButton>

		<client-only>
			<NavbarButton disabled>
				<Player :xid="playerId" />
			</NavbarButton>
		</client-only>
		<client-only v-if="playerId">
			<NavbarButton
				class="d-print-none"
				to="/settings"
			>
				<i class="fas fa-cog fa-fw" />
			</NavbarButton>
		</client-only>
		<NavbarButton
			class="d-none d-sm-block d-print-none"
			@click="SET_DARK_MODE(!darkMode)"
		>
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
