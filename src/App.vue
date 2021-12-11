<template>
	<div
		class="d-flex flex-column"
		:class="dark ? 'bg-dark text-light' : null"
		style="min-height: 100%"
	>
		<Navbar />
		<div class="d-flex flex-column flex-grow-1">
			<div class="container my-5">
				<router-view />
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
import { mapState } from "vuex";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";

export default {
	components: { Footer, Navbar },
	metaInfo: {
		titleTemplate: "%s | TORN City Losers' Log",
	},
	computed: {
		...mapState(["dark"]),
	},
};
</script>
