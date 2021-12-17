<template>
	<div class="container-fluid">
		<client-only>
			<p>
				Database updated
				<timeago
					:auto-update="10"
					class="font-weight-bold"
					:datetime="lastUpdated"
				/>
			</p>
		</client-only>
		<div class="d-flex flex-column flex-lg-row gap">
			<div>
				<client-only>
					<LogControls />
				</client-only>
			</div>
			<div class="flex-grow-1">
				<client-only>
					<LogList />
				</client-only>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	head: {
		title: 'Log',
	},
	computed: {
		...mapState('log', ['lastUpdated']),
	},
	beforeMount() {
		if (!this.$store.state.settings.apiKey) {
			this.$router.replace('/migrate');
		}
	},
};
</script>
