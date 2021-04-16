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
// TODO save items/page setting
// TODO invoice generator in  modal/separate page. list of unpaid clients with editable price and remove from invoice btn, calculates subtotals and total, formats as PRE, or maybe provides more format options
// TODO upgrade to Vue CLI 4, Vue 3
// TODO app logo, brand, favicon
// TODO promo poster to forum topic (366 or 602px width) - highlight main features, zoom circles
// TODO settings page / widget menu - bar chart options for day limit: 10, 15, 21, 30
// TODO settings page / widget menu - select log tabs to show
// TODO Hide feature A) "Hide" button in log entry: exclude losses from top widgets and Clients/Unpaid tabs. on other tabs it can be with lighter font color, without Paid button but with Unhide. grouping should consider "hidden" flag too.
// TODO Hide feature B) "Hide" button on client level: hides that client from top widgets and all tabs. Can be unhidden on settings page.
// TODO mark amount of paid losses in bar chart by stacking bars?
// TODO display about markdown file in app
// TODO dark mode?
// TODO match TORN colors?

import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";

export default {
	components: { Footer, Navbar },
	metaInfo: {
		titleTemplate: "%s | TORN City Losers' Log",
	},
};
</script>
