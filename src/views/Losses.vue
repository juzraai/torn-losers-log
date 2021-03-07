<template>
	<List :list="losses" />
</template>

<script>
import { mapGetters } from "vuex";
import List from "@/components/List.vue";

export default {
	components: { List },
	computed: {
		...mapGetters(["losses"]),
	},
};
</script>
