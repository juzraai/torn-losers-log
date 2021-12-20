<template>
	<div class="d-flex p-2 px-lg-3">
		<div class="d-flex flex-column flex-grow-1 ">
			<strong>
				{{ role === 'attacker' ? 'Outgoing' : 'Incoming' }}
				{{ paid ? '' : 'unpaid' }}
				{{ result === 'Lost' ? 'losses' : 'escapes' }}
			</strong>
			<small class="text-muted">
				updated
				<timeago
					:auto-update="10"
					:datetime="lastUpdated"
				/>
			</small>
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
		...mapState('log', ['lastUpdated', 'paid', 'result', 'role']),
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
