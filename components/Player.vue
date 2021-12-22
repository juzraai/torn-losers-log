<template>
	<span v-if="xid" :class="{ censored: blur }">
		<a
			v-if="link"
			:href="url"
			target="_blank"
		>{{ label }}</a>
		<span v-else>{{ label }}]</span>
	</span>
</template>

<script>
import { liveQuery } from 'dexie';
import { mapState } from 'vuex';
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
		...mapState('ui', ['censored']),
		blur() {
			return this.censored && this.xid !== 2413874;
		},
		label() {
			return `${this.blur ? 'Someone' : (this.name || '')} [${this.blur ? '000000' : this.xid}]`;
		},
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
