<template>
	<div class="container">
		<div class="row">
			<div class="col col-md-10 col-lg-8 col-xl-7 mx-auto">
				<Card>
					<div
						v-if="showBack"
						class="card-header d-print-none py-1"
					>
						<b-button
							class="border-0"
							size="sm"
							:to="backTo"
							variant="link"
						>
							<i class="fas fa-long-arrow-alt-left mr-1" />
							{{ backLabel }}
						</b-button>
					</div>
					<div class="card-body">
						<h2
							v-if="title"
							class="card-title mb-4"
							v-text="title"
						/>
						<slot />
					</div>
					<div class="card-footer d-flex d-print-none justify-content-between">
						<slot name="footer" />
					</div>
				</Card>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		backLabel: {
			type: String,
			default: 'What is TLL?',
		},
		backTo: {
			type: String,
			default: '/',
		},
		showBack: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: '',
		},
	},
};
</script>

<style scoped>
@media print {
	.container > .row > .col {
		flex: 1;
		max-width: 100%;
		width: 100%;
	}
}
</style>
