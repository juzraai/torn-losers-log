<template>
	<div class="container">
		<div class="d-flex flex-column flex-lg-row gap">
			<div class="d-print-none">
				<client-only>
					<LogControls />
				</client-only>
			</div>
			<div class="flex-grow-1">
				<client-only>
					<LogList v-if="listMode" />
					<Dash v-else />
				</client-only>
			</div>
		</div>
		<ForumThreadModal />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { GROUPING } from '@/services/database';

export default {
	head: {
		title: 'Log',
	},
	computed: {
		...mapState('log', ['group']),
		listMode() {
			return this.group !== GROUPING.DAYS;
		},
	},
	beforeMount() {
		if (!this.$store.state.settings.apiKey) {
			this.$router.replace('/migrate');
		}
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

.container {
	@include media-breakpoint-down(md) {
		max-width: unset;
	}
}
</style>
