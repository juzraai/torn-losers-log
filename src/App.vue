<template>
	<div class="bg-light h-100">
		<div class="h-100 d-flex flex-column justify-content-center">
			<div class="container">
				<div
					class="row"
					v-if="!apiKey"
				>
					<Login />
				</div>
				<div
					class="row"
					v-else
				>
					<div class="col-md-11 col-lg-10 mx-auto my-5">
						<ul class="mb-3 nav nav-pills">
							<li
								class="nav-item"
								:key="r.path"
								v-for="r in routes"
							>
								<router-link
									class="nav-link"
									:class="{ active: r.path == $router.currentRoute.path }"
									:to="r.path"
								>{{ r.name }}</router-link>
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
						<router-view />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Login from "@/components/Login.vue";
import { routes } from "@/router";

export default {
	components: { Login },
	data() {
		return {
			routes,
		};
	},
	computed: {
		...mapState(["apiKey", "lastUpdate", "names", "playerId"]),
	},
	methods: {
		...mapActions(["fetchLosses"]),
	},
};
</script>
