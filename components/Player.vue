<template>
	<a
		v-if="id"
		:href="url"
		target="_blank"
	>{{ name }} [{{ id }}]</a>
</template>

<script>
import { liveQuery } from 'dexie';

export default {
	props: {
		id: {
			type: Number,
			default: null,
		},
	},
	data: () => ({
		name: null,
	}),
	computed: {
		url() {
			return `https://www.torn.com/profiles.php?XID=${this.id}`;
		},
	},
	watch: {
		id() {
			this.init();
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			if (this.id) {
				liveQuery(() => this.$db.players.get(this.id)).subscribe(player => {
					this.name = player?.name;
				});
			}
		},
	},
};
</script>
