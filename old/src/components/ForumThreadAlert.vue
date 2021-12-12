<template>
	<div class="row">
		<div class="col">
			<b-alert
				class="mb-4 shadow-sm"
				:show="!forumAlertDismissed && losses.length > 1500"
				variant="primary"
			>
				<p>
					You've been using <strong>TLL</strong> for a couple of days now. If you like it, please consider upvoting
					<a
						class="alert-link"
						href="https://www.torn.com/forums.php#/p=threads&f=67&t=16219540&b=0&a=0"
						target="_blank"
					>&raquo;&nbsp;its&nbsp;forum&nbsp;thread&nbsp;&laquo;</a>
					to show me some love. &hearts;
				</p>
				<hr>
				<button
					class="btn btn-primary mr-3"
					@click="dismiss"
					title="Close notification"
					v-b-tooltip.hover.bottom
				>
					<i class="fas fa-fw fa-check mr-1"></i>
					Done!
				</button>
				<button
					class="btn btn-outline-primary mr-3"
					@click="dismiss"
					title="Close notification"
					v-b-tooltip.hover.bottom
				>
					<i class="fas fa-fw fa-times mr-1"></i>
					No way!
				</button>
			</b-alert>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
	computed: {
		...mapState(["forumAlertDismissed", "losses"]),
	},
	methods: {
		...mapMutations(["setForumAlertDismissed"]),
		dismiss() {
			this.setForumAlertDismissed(true)
		},
	},
};
</script>
