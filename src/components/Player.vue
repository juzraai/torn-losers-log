<template>
	<span class="font-weight-bold">
		<span
			class="d-inline-block mx-1 text-secondary"
			role="button"
			v-if="!names[id]"
			@click="resolveName(id)"
		>Resolve name</span>
		<a
			class="d-inline-block mx-1"
			:href="'https://www.torn.com/profiles.php?XID=' + id"
		>
			<span v-if="names[id]">{{ names[id] }}</span>
			[{{ id }}]
		</a>
	</span>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
	props: ["id"],
	computed: {
		...mapState(["names"]),
	},
	methods: {
		...mapActions(["resolveName"]),
	},
};
</script>
