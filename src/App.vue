<template>
	<div
		class="d-flex flex-column"
		style="min-height: 100%"
	>
		<Navbar />
		<div class="d-flex flex-column flex-grow-1">
			<div class="container my-5">
				<router-view />
			</div>
		</div>
		<div class="bg-dark text-white">footer :)</div>
	</div>
</template>

<script>
// TODO implement footer
// TODO add "censorship mode" on/off switch (into dropdown?) which blurs Player components
import Login from "@/components/Login.vue";
import Navbar from "@/components/Navbar.vue";

export default {
	components: { Login, Navbar },
};
</script>
