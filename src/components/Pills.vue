<template>

	<ul class="mb-3 nav nav-pills">
		<li
			class="nav-item"
			:key="r.path"
			v-for="r in routes"
		>
			<router-link
				class="nav-link"
				:class="{ active: r.path == $route.path }"
				:to="r.path"
			>
				<i
					class="fas fa-fw mr-lg-1"
					:class="r.icon"
					v-if="r.icon"
				></i>
				<span class="d-none d-lg-inline">{{ r.name }}</span>
			</router-link>
		</li>
		<li class="ml-auto nav-item">
			<a
				class="disabled nav-link"
				href="#"
			>
				<timeago
					:auto-update="60"
					:datetime="lastUpdate"
					v-if="lastUpdate"
				/>
			</a>
		</li>
		<li class="nav-item">
			<a
				class="nav-link refresh-button"
				href="javascript:void(0)"
				@click="fetchLosses"
			>
				<i class="fas fa-sync-alt"></i>
			</a>
		</li>
	</ul>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { routes } from "@/router";

export default {
	data() {
		return {
			routes,
		};
	},
	computed: {
		...mapState(["lastUpdate"]),
	},
	methods: {
		...mapActions(["fetchLosses"]),
	},
};
</script>
