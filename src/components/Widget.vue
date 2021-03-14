<template>
	<div
		class="d-flex flex-column h-100 widget"
		:class="loading ? 'loading' : null"
	>
		<div
			class="card flex-grow-1 mb-4 shadow-sm"
			:class="cardClass"
		>
			<div
				class="card-body d-flex flex-column"
				:class="cardBodyClass"
			>
				<h6
					class="card-title"
					v-if="title"
				>
					{{ title }}
				</h6>
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	props: ["cardClass", "cardBodyClass", "title"],
	computed: {
		...mapState(["loading"]),
	},
};
</script>

<style>
.widget .card {
	min-height: 160px;
}

.widget.loading .card {
	filter: blur(1px) saturate(0);
	pointer-events: none;
}
</style>
