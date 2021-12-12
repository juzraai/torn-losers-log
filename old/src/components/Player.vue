<template>
	<span :style="{ filter: hideClients ? 'blur(1px)' : null }">
		<span
			:class="dark ? 'text-light' : 'text-secondary'"
			role="button"
			title="1 API call"
			v-b-tooltip.hover.bottom
			v-if="!names[id]"
			@click="resolveName(id)"
		>{{ hideClients ? 'someone' : 'Click to resolve name' }}</span>
		<a
			:class="'text-' + (variant || 'dark')"
			:href="'https://www.torn.com/profiles.php?XID=' + id"
			target="_blank"
		>
			<span v-if="names[id]">{{ hideClients ? 'someone' : names[id] }}</span>
			[{{ hideClients ? '######' : id }}]
		</a>
	</span>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
	props: ["id", "variant"],
	computed: {
		...mapState(["dark", "hideClients", "names"]),
	},
	methods: {
		...mapActions(["resolveName"]),
	},
};
</script>
