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
// TODO app logo, brand, favicon
// TODO bar chart options for day limit: 10, 15, 21, 30
// TODO mark amount of paid losses in bar chart by stacking bars?
// TODO "Hide" button: exclude losses from top widgets and Clients/Unpaid tabs. on other tabs it can be with lighter font color, without Paid button but with Unhide. grouping should consider "hidden" flag too
// TODO display about markdown file in app
// TODO if version is newer than previously stored, display success-alert on dashboard!
// TODO invoice generator: modal window displays unpaid clients with editable price and remove from invoice, calculates subtotals and total, formats as PRE

import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";

export default {
	components: { Footer, Navbar },
	metaInfo: {
		titleTemplate: "%s | TORN City Losers' Log",
	},
};
</script>
