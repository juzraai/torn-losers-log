<template>
	<div class="container">
		<div class="row">
			<div class="col col-md-10 col-lg-8 col-xl-7 mx-auto">
				<div class="border-0 card shadow">
					<div
						v-if="showBack"
						class="card-header py-1"
					>
						<b-button
							class="border-0"
							size="sm"
							to="/"
							variant="link"
						>
							<i class="fas fa-long-arrow-alt-left mr-1" />
							What is TLL?
						</b-button>
					</div>
					<div class="card-body">
						<h2 class="card-title mb-4">{{ title }}</h2>
						<slot />
					</div>
					<div class="card-footer d-flex justify-content-between">
						<slot name="footer" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		showBack: { type: Boolean, default: false },
		title: { type: String, default: '' },
	},
};
</script>
