<template>
	<div class="align-items-start d-flex justify-content-between my-1">
		<div class="d-flex">
			<NavbarButton to="/">
				TLL
			</NavbarButton>
			<NavbarButton
				v-if="$route.name === 'log'"
				to="/help"
			>
				<i class="fas fa-question fa-fw" />
			</NavbarButton>
		</div>

		<client-only>
			<NavbarButton disabled>
				<Player :xid="playerId" />
			</NavbarButton>
		</client-only>

		<div class="d-flex">
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
