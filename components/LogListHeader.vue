<template>
	<div class="d-flex p-2 px-lg-3">
		<div class="flex-grow-1 font-weight-bold">
			{{ role === 'attacker' ? 'Outgoing' : 'Incoming' }}
			{{ result === 'Lost' ? 'losses' : 'escapes' }}
		</div>
		<div
			v-if="unpaid"
			class="font-weight-bold text-danger"
		>
			$ {{ $price(unpaid) }}
		</div>
	</div>
</template>

<script>
import { liveQuery } from 'dexie';
import { mapState } from 'vuex';
import DB from '@/services/database';

export default {
	data: () => ({
		unpaid: 0,
	}),
	computed: {
		...mapState('log', ['result', 'role']),
		...mapState('settings', ['playerId']),
		updateTrigger() {
			return [this.result, this.role].join(';');
		},
	},
	watch: {
		updateTrigger() {
			this.init();
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.unpaid = 0;
			liveQuery(() =>
				DB.sumOfUnpaid(this.role, this.playerId, this.result)
			).subscribe(unpaid => {
				console.log('LISTHEADER liveQuery', unpaid);
				this.unpaid = unpaid;
			});
		},
	},
};
</script>
