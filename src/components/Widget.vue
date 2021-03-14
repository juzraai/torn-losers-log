<template>
	<div class="d-flex flex-column h-100 widget">
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
export default {
	props: ["cardClass", "cardBodyClass", "title"],
};
</script>
