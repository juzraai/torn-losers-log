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
// TODO bar chart options for day limit: 10, 15, 21, 30
// TODO mark amount of paid losses in bar chart by stacking bars?
// TODO mark a loss as "non-s**t" loss - maybe a "Hide" button and "hidden" badge which excludes it from KPIs. maybe lists could have a global option to show hidden ones, and grouping should take into account hidden state too!
// TODO display about and changelog markdown files in app

import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";

export default {
	components: { Footer, Navbar },
	metaInfo: {
		titleTemplate: "%s | TORN City Losers' Log",
	},
};
</script>
