<template>
	<Card _class="w-100">
		<div class="card-body">
			<b-button
				disabled
				size="lg"
				:variant="darkMode ? 'secondary' : 'primary'"
			>
				<i class="fas fa-sync fa-fw" />
			</b-button>
		</div>
	</Card>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState('settings', ['darkMode']),
	},
};
</script>
