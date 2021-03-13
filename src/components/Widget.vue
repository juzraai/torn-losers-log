<template>
	<div class="d-flex flex-column h-100">
		<div class="card flex-grow-1 mb-4 shadow-sm" :class="cardClasses">
			<div class="card-body d-flex flex-column p-3">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["cardClasses"],
};
</script>
