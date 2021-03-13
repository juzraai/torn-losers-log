<template>
	<span>
		<span
			class="text-secondary"
			role="button"
			title="1 API call"
			v-b-tooltip.hover.bottom
			v-if="!names[id]"
			@click="resolveName(id)"
		>Resolve name</span>
		<a
			:class="'text-' + (variant || 'dark')"
			:href="'https://www.torn.com/profiles.php?XID=' + id"
			target="_blank"
		>
			<span v-if="names[id]">{{ names[id] }}</span>
			[{{ id }}]
		</a>
	</span>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
	props: ["id", "variant"],
	computed: {
		...mapState(["names"]),
	},
	methods: {
		...mapActions(["resolveName"]),
	},
};
</script>
