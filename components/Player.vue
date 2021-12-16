<template>
	<span v-if="id">
		<a
			v-if="link"
			:href="url"
			target="_blank"
		>{{ name }} [{{ id }}]</a>
		<span v-else>{{ name }} [{{ id }}]</span>
	</span>
</template>

<script>
import { liveQuery } from 'dexie';

export default {
	props: {
		id: {
			type: Number,
			default: null,
		},
		link: {
			type: Boolean,
			default: false,
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
