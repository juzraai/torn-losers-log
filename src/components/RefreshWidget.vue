<template>
	<Widget
		card-classes="alert alert-danger p-0"
		role="button"
		@click="fetchLosses"
	>
		<h6 class="card-title">Log refreshed</h6>
		<h5 class="card-subtitle">
			<timeago
				:auto-update="60"
				:datetime="lastUpdate"
				v-if="lastUpdate"
			/>
		</h5>
		<div class="align-items-center d-flex flex-grow-1 justify-content-center">
			<i class="alert-link fas fa-sync-alt mt-3"></i>
		</div>
	</Widget>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Widget from "@/components/Widget.vue";

export default {
	components: { Widget },
	computed: {
		...mapState(["lastUpdate"]),
	},
	methods: {
		...mapActions(["fetchLosses"]),
	},
};
</script>

<style lang="scss" scoped>
i {
	font-size: 2rem;
	transition: font-size 0.2s;
}
.alert:hover {
	background: blue !important;

	i {
		font-size: 2.5rem;
		//-webkit-animation: fa-spin 2s linear infinite;
		//animation: fa-spin 2s linear infinite;
	}
}

@keyframes fa-spin {
	0% {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(1turn);
		transform: rotate(1turn);
	}
}
</style>

