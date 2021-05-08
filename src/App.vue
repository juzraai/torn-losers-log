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

// TODO money/hit
// - (?) move total price to right (green=paid, red=unpaid), replace Paid button with checkbox
// - (?) nicer editor for price

// TODO proof export
// - buttons in top right corner
// - copy to clipboard as unformatted text
// - generate and download PDF - https://github.com/bpampuch/pdfmake

// TODO invoice generator in modal/separate page
// - list of unpaid contracts with remove from invoice btn
// - calculates ~~subtotals and~~ total
// - formats as PRE for Discord, or maybe provides more format options (screenshot download???)
// - combined proof download options (copy all, PDF all)

// TODO upgrade to Vue CLI 4, Vue 3

// TODO promo banner/poster to forum topic
// - 366 or 602px width
// - highlight main features, zoom circles
// - have transparent background (PNG)
// - host on GitHub

// TODO customizations
// - on settings page OR on widget top right dropdown menu w/ ellipsis-v icon
// - bar chart options for day limit: 10, 15, 21, 30
// - select log tabs to show/hide with checkboxes
// - set limit for stored losses (lower limit can improve UX)

// TODO "Hide" feature
// A) log entry level
// - button in log entry
// - excludes losses from top widgets and Sessions/Clients/Unpaid tabs
// - on Losses tab it can be w/ lighter font color, without Paid button, but with Unhide
// - grouping should consider "hidden" flag too - just jump over it
// B) client level
// - button... where?
// - hides from top widgets and all tabs
// - hidden client list and unhide option on settings page

// TODO (?) think about money related KPIs/charts and how to place them
// - KPIs: earned today, this week, this month

// TODO (?) chart: stacking bar chart with paid+unpaid losses

// TODO (?) display about markdown file in app

// TODO (?) match TORN colors

// TODO (?) dark mode

import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";

export default {
	components: { Footer, Navbar },
	metaInfo: {
		titleTemplate: "%s | TORN City Losers' Log",
	},
};
</script>
