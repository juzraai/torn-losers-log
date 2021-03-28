<template>
	<b-navbar
		class="shadow-sm"
		toggleable="md"
		type="light"
		variant="light"
	>
		<b-navbar-brand
			_class="font-italic font-weight-bold navbar-brand text-dark"
			to="/"
		>TORN City Losers' Log</b-navbar-brand>
		<b-navbar-toggle target="navbar-collapse"></b-navbar-toggle>

		<b-collapse
			id="navbar-collapse"
			is-nav
		>
			<ul class="navbar-nav">
				<li class="nav-item">
					<a
						class="nav-link"
						href="https://github.com/juzraai/torn-losers-log/blob/main/docs/ABOUT.md"
						target="_blank"
					>About</a>
				</li>
			</ul>
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
					<b-dd-item-button
						v-if="!hideClients"
						@click="setHideClients(true)"
					>
						<i class="fas fa-eye-slash fa-fw mr-2"></i>
						Hide clients
					</b-dd-item-button>
					<b-dd-item-button
						v-else
						@click="setHideClients(false)"
					>
						<i class="fas fa-eye fa-fw mr-2"></i>
						Show clients
					</b-dd-item-button>
					<b-dd-divider></b-dd-divider>
					<b-dd-item-button
						variant="danger"
						@click="clearDataWithConfirm"
					>
						<i class="fas fa-trash-alt fa-fw mr-2"></i>
						Clear data
					</b-dd-item-button>
				</b-nav-item-dd>
			</ul>
		</b-collapse>
	</b-navbar>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { formatTimestamp } from "@/services/tornFormat.js";

export default {
	data() {
		return {
			time: this.getTctTime(),
		};
	},
	computed: {
		...mapState(["apiKey", "hideClients", "names", "playerId"]),
	},
	methods: {
		...mapActions(["clearData"]),
		...mapMutations(["setHideClients"]),
		clearDataWithConfirm() {
			if (
				confirm("Are you sure you want to clear your TLL data in this browser?")
			) {
				this.clearData();
			}
		},
		getTctTime() {
			return formatTimestamp(new Date().getTime() / 1000);
		},
	},
	mounted() {
		setInterval(() => (this.time = this.getTctTime()), 500);
	},
};
</script>
