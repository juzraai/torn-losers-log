<template>
	<div>
		<ul class="list-group">
			<li
				class="list-group-item"
				:key="a.code"
				v-for="a in lossesOnPage"
			>
				You lost to {{ a.defender_id }}
				<a
					:href="'https://www.torn.com/loader.php?sid=attackLog&ID=' + a.code"
					target="_blank"
				>
					<Timeago
						:auto-update="60"
						:datetime="a.timestamp_ended * 1000"
					/>
				</a>
			</li>
		</ul>
		<div>
			left: items per page settings
			right: prev/next btns
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	data() {
		return {
			page: 0,
		};
	},
	computed: {
		...mapState(["losses"]),
		lossesOnPage() {
			return this.losses.slice(this.page * 10, this.page * 10 + 10);
		},
	},
};
</script>
