<template>
	<strong>
		<span
			class="text-secondary"
			role="button"
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
	</strong>
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
