<template>
	<nav class="navbar navbar-expand-sm navbar-light">
		<router-link
			class="font-italic font-weight-bold navbar-brand text-dark"
			to="/"
		>TORN City Losers' Log</router-link>
		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbar"
			aria-controls="navbar"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<div
			class="collapse navbar-collapse"
			id="navbar"
		>
			<ul
				class="navbar-nav ml-auto"
				v-if="apiKey"
			>
				<li
					class="nav-item mr-3"
					title="TORN City Time<br>(Same as UTC or GMT)"
					v-b-tooltip.hover.bottom.html
				>
					<span class="disabled nav-link text-secondary">{{ time }} TCT </span>
				</li>
				<b-nav-item-dd right>
					<template #button-content>
						<strong>{{ names[playerId] }} [{{ playerId }}]</strong>
					</template>
					<b-dd-item
						:href="'https://www.torn.com/profiles.php?XID=' + playerId"
						target="_blank"
					>
						<i class="fas fa-user-circle fa-fw mr-2"></i>
						View profile
					</b-dd-item>
					<b-dd-divider></b-dd-divider>
					<b-dd-item-button variant="danger">
						<i class="fas fa-trash-alt fa-fw mr-2"></i>
						Clear data
					</b-dd-item-button>
				</b-nav-item-dd>
			</ul>
		</div>
	</nav>
</template>

<script>
// TODO fix dropdown menu (Bootstrap-Vue)
// TODO implement dropdown features
import { mapState } from "vuex";
import { formatTimestamp } from "@/util.js";

export default {
	data() {
		return {
			time: this.getTctTime(),
		};
	},
	computed: {
		...mapState(["apiKey", "names", "playerId"]),
	},
	methods: {
		getTctTime() {
			return formatTimestamp(new Date().getTime() / 1000);
		},
	},
	mounted() {
		setInterval(() => (this.time = this.getTctTime()), 500);
	},
};
</script>
