<template>
	<div>
		<NewVersionAlert />
		<div class="row">
			<div class="col-sm-6 col-lg-3">
				<RefreshWidget />
			</div>
			<div class="col-sm-6 col-lg-3">
				<RecentClientsWidget />
			</div>
			<div class="col-sm-6 col-lg-3">
				<TodaysCountWidget />
			</div>
			<div class="col-sm-6 col-lg-3">
				<DailyCountsWidget />
			</div>
		</div>
		<div class="row">
			<div class="col">
				<LogWidget />
			</div>
		</div>
	</div>
</template>

<script>
import DailyCountsWidget from "@/components/DailyCountsWidget.vue";
import LogWidget from "@/components/LogWidget.vue";
import NewVersionAlert from "@/components/NewVersionAlert.vue";
import RecentClientsWidget from "@/components/RecentClientsWidget.vue";
import RefreshWidget from "@/components/RefreshWidget.vue";
import TodaysCountWidget from "@/components/TodaysCountWidget.vue";

export default {
	components: {
		DailyCountsWidget,
		LogWidget,
		NewVersionAlert,
		RecentClientsWidget,
		RefreshWidget,
		TodaysCountWidget,
	},
	metaInfo: {
		title: "Dashboard",
	},
};
</script>
