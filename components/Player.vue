<template>
	<span v-if="xid">
		<a
			v-if="link"
			:href="url"
			target="_blank"
		>{{ name }} [{{ xid }}]</a>
		<span v-else>{{ name }} [{{ xid }}]</span>
	</span>
</template>

<script>
import { liveQuery } from 'dexie';
import DB from '@/services/database';

export default {
	props: {
		link: {
			type: Boolean,
			default: false,
		},
		xid: {
			type: Number,
			default: null,
		},
	},
	data: () => ({
		name: null,
	}),
	computed: {
		url() {
			return `https://www.torn.com/profiles.php?XID=${this.xid}`;
		},
	},
	watch: {
		xid() {
			this.init();
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			if (this.xid) {
				liveQuery(() => DB.getPlayer(this.xid)).subscribe(player => {
					this.name = player?.name;
				});
			}
		},
	},
};
</script>
