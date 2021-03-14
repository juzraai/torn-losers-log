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
				<li class="nav-item dropdown">
					<a
						class="font-weight-bold nav-link dropdown-toggle text-dark"
						href="#"
						id="playerDropdown"
						role="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						{{ names[playerId] }} [{{ playerId }}]
					</a>
					<div
						class="dropdown-menu dropdown-menu-right"
						aria-labelledby="playerDropdown"
					>
						<a
							class="dropdown-item"
							:href="'https://www.torn.com/profiles.php?XID=' + playerId"
							target="_blank"
						>
							<i class="fas fa-user-circle fa-fw mr-2"></i>
							View profile
						</a>
						<div class="dropdown-divider"></div>
						<a
							class="dropdown-item text-danger"
							href="#"
						>
							<i class="fas fa-trash-alt fa-fw mr-2"></i>
							Clear data
						</a>
					</div>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
// TODO fix dropdown menu (Bootstrap-Vue)
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
