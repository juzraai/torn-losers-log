<template>
	<div class="log-controls-mockup border d-flex mb-3 mx-lg-4 p-2 rounded shadow-sm">
		<div
			v-for="(icons, i) in buttons"
			:key="i"
			class="flex-grow-1"
		>
			<b-button
				v-if="selected === false || selected === i"
				block
				style="pointer-events: none"
				variant="primary"
			>
				<i
					class="fa-fw"
					:class="icons[0]"
				/>
			</b-button>
			<b-button
				v-else
				block
				class="shadow-none"
				disabled
				style="pointer-events: none"
				:variant="darkMode ? 'secondary' : 'light'"
			>
				<i
					class="fa-fw"
					:class="icons[0]"
					style="color: transparent"
				/>
			</b-button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	props: {
		selected: {
			type: [Boolean, Number],
			default: false,
		},
	},
	data: () => ({
		buttons: [
			['fas fa-sync'],
			['fas fa-crosshairs', 'fas fa-shield-alt'],
			['fas fa-skull', 'fas fa-running'],
			['fas fa-bars', 'fas fa-th-list', 'fas fa-users', 'far fa-chart-bar'],
			['fas fa-check'],
		],
	}),
	computed: {
		...mapState('settings', ['darkMode']),
	},
};
</script>
