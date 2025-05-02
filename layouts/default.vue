<template>
	<div
		class="d-flex flex-column transitions"
		:class="{ dark: darkMode, lite: !darkMode }"
	>
		<div class="d-flex flex-column h-full">
			<Navbar />
			<div class="flex-grow-1 py-3 py-md-4">
				<Nuxt />
			</div>
		</div>
		<Footer />
		<b-overlay
			class="position-fixed"
			no-fade
			no-wrap
			:show="loading"
			spinner-variant="white"
			variant="dark"
		/>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import NAME_RESOLVER from '@/services/name-resolver';
import UPDATER from '@/services/updater';

export default {
	computed: {
		...mapState('settings', ['announcedVersion', 'darkMode', 'updateOnLoad']),
		...mapState('ui', ['loading']),
	},
	beforeCreate() {
		if (this.$loadPreviousState) {
			this.$loadPreviousState();
			this.$nextTick(() => {
				if (this.announcedVersion !== this.$config.APP_VERSION) {
					this.$router.replace('/update');
				}
			});
		}
	},
	async mounted() {
		if (this.updateOnLoad) {
			if (!await UPDATER.updateAttacks()) {
				this.errorToast('TORN API returned no attacks. See developer console for error.');
			}
		}
		NAME_RESOLVER.schedule();
		UPDATER.schedule();
		this.SET_LOADING(false);
	},
	methods: {
		...mapMutations('ui', ['SET_LOADING']),
	},
};
</script>
