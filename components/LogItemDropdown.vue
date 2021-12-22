<template>
	<b-dropdown
		boundary="viewport"
		dropleft
		no-caret
		toggle-class="border-0 rounded-0 shadow-none list-item-dropdown-toggle"
		:variant="darkMode ? 'dark' : 'light'"
	>
		<template #button-content>
			<i class="fas fa-ellipsis-v" />
		</template>
		<b-dropdown-item-button @click="$emit('openInvoice')">
			Open invoice
		</b-dropdown-item-button>
		<b-dropdown-item-button
			v-if="attacks[0].paid"
			@click="$emit('togglePaid')"
		>
			Mark this and newer attacks<br>
			of this player as <strong class="text-danger">unpaid</strong>
		</b-dropdown-item-button>
		<b-dropdown-item-button
			v-else
			@click="$emit('togglePaid')"
		>
			Mark this and older attacks<br>
			of this player as <strong class="text-success">paid</strong>
		</b-dropdown-item-button>
	</b-dropdown>
</template>

<script>
import { mapState } from 'vuex';

export default {
	props: {
		attacks: {
			type: Array,
			default: () => [{ paid: 0 }],
		},
	},
	computed: {
		...mapState('settings', ['darkMode']),
	},
};
</script>

<style>
/* not working with `scoped` for some reason */
.list-item-dropdown-toggle {
	background-color: transparent;
}
</style>
