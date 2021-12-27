<template>
	<b-modal
		ref="upvoteModal"
		cancel-title="Close"
		cancel-variant="link"
		centered
		footer-class="d-flex justify-content-between py-2"
		header-class="py-2"
		:modal-class="darkMode ? 'dark' : null"
		ok-title="Sure, let's go!"
		title="Can I haz upvote?"
		@hidden="SET_BEGGED_FOR_UPVOTE(true)"
		@ok="$refs.link.click()"
	>
		<p>
			You've been using <strong>TLL</strong> for a couple of days now. If you like it, please consider upvoting
			<a
				ref="link"
				class="font-weight-bold"
				href="https://www.torn.com/forums.php#/p=threads&f=67&t=16219540&b=0&a=0"
				target="_blank"
			>its&nbsp;forum&nbsp;thread</a>
			to show me some love. <i class="fas fa-heart ml-1" />
		</p>
	</b-modal>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import DB from '@/services/database';

export default {
	computed: {
		...mapState('settings', ['beggedForUpvote', 'darkMode']),
	},
	async mounted() {
		if (!this.beggedForUpvote) {
			const records = await DB.countAllAttacks();
			if (records > 1500) {
				this.$refs.upvoteModal.show();
			}
		}
	},
	methods: {
		...mapMutations('settings', ['SET_BEGGED_FOR_UPVOTE']),
	},
};
</script>
