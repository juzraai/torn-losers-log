<template>
	<div class="card mb-4 shadow-sm">
		<div class="card-body p-3">
			<h6
				class="card-title"
				v-html="(labels || [])[0] || '&nbsp;'"
			></h6>
			<h1
				class="font-weight-bold"
				v-html="(values || [])[0] || '&nbsp;'"
			></h1>
			<div class="row">
				<div
					class="col-6"
					:key="i"
					v-for="i in 2"
				>
					<h5
						class="mb-1"
						v-html="(values || [])[i] || '&nbsp;'"
					></h5>
					<div
						class="small text-truncate"
						v-html="(labels || [])[i] || '&nbsp;'"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["labels", "values", "variant"],
};
</script>
