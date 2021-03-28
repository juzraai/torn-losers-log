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
		<Footer />
	</div>
</template>

<script>
// TODO recommend fetch freq for user
// TODO add build time and version to footer
// TODO add help texts into app
// TODO link about page
// TODO release 1.0
// TODO set up CD https://github.com/marketplace/actions/vue-to-github-pages
// TODO import/export feature for manual syncing - import on login screen too!
// TODO export feature could start a download, and can even send the compressed stuff
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";

export default {
	components: { Footer, Navbar },
	metaInfo: {
		titleTemplate: "%s | TORN City Losers' Log",
	},
};
</script>
