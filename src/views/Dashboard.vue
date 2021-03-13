<template>
	<div>
		<div class="row">
			<div class="col-6 col-lg-3">
				<RefreshWidget />
			</div>
			<div class="col-6 col-lg-3">
				<KpiWidget :labels="['Losses today', 'yesterday', 'average']" />
			</div>
			<div class="col-6 col-lg-3">
				<KpiWidget />
			</div>
			<div class="col-6 col-lg-3">
				<KpiWidget />
			</div>
		</div>
	</div>
</template>

<script>
import KpiWidget from "@/components/KpiWidget.vue";
import RefreshWidget from '@/components/RefreshWidget.vue';

export default {
	components: { KpiWidget, RefreshWidget },
};
</script>
