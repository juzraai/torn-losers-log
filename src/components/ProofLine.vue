<template>
	<span>
		{{ number }}.
		{{ formatTimestamp(attack.timestamp_ended) }}
		<a
			:href="href"
			target="_blank"
		>{{ href }}</a>
	</span>
</template>

<script>
import { formatTimestamp } from "@/services/tornFormat.js";

export default {
	props: ["attack", "number"],
	computed: {
		href() {
			return (
				"https://www.torn.com/loader.php?sid=attackLog&ID=" + this.attack.code
			);
		},
	},
	methods: {
		formatTimestamp,
	},
};
</script>
