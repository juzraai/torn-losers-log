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
// TODO release 1.0
// TODO set up CD https://github.com/marketplace/actions/vue-to-github-pages

// next version:
// TODO timestamp column should be constant height in list - maybe switch back to table?
// TODO import/export feature for manual syncing - import on login screen too!
// TODO export feature could start a download, and can even send the compressed stuff
// TODO bar chart options for day limit: 10, 15, 21, 30
// TODO mark amount of paid losses in bar chart by stacking bars?

import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";

export default {
	components: { Footer, Navbar },
	metaInfo: {
		titleTemplate: "%s | TORN City Losers' Log",
	},
};
</script>
