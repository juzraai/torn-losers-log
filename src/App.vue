<template>
	<div class="bg-light h-100">
		<div class="h-100 d-flex flex-column justify-content-center">
			<div class="container">
				<div class="row">
					<div class="col-md-10 col-lg-8 mx-auto my-5">
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
								>timeago</a>
							</li>
							<li class="nav-item">
								<a
									href="#"
									class="nav-link refresh-button"
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
import { routes } from "@/router"

export default {
	data() {
		return {
			routes,
		};
	},
};
</script>
