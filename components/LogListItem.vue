<template>
	<div
		v-if="attacks[0]"
		class="d-flex align-items-center gap"
	>
		<div
			v-if="group !== 'event'"
			class="font-weight-bold lead text-right"
			style="min-width: 35px;"
		>
			{{ attacks.length }}x
		</div>
		<div class="d-flex flex-column flex-grow-1">
			<div class="small">
				{{ $timestamp(attacks[0].timestamp_ended) }}
				<span v-if="attacks.length > 1">
					- {{ $timestamp(attacks[attacks.length - 1].timestamp_ended) }}
				</span>
			</div>
			<div>
				<span v-if="role === 'attacker'">
					You
					{{ attacks[0].result === 'Lost' ? 'lost to' : 'escaped from' }}
					<Player
						class="font-weight-bold"
						link
						:xid="attacks[0].defender_id"
					/>
				</span>
				<span v-else>
					<Player
						class="font-weight-bold"
						link
						:xid="attacks[0].attacker_id"
					/>
					{{ attacks[0].result === 'Lost' ? 'lost to' : 'escaped from' }}
					you
				</span>
				<br>
				<small :class="attacks[0].paid ? 'text-success' : 'text-danger'">
					<span v-if="attacks[0].price">
						${{ attacks[0].price * attacks.length }} (${{ attacks[0].price }} each)
					</span>
					<span v-else>
						{{ attacks[0].paid ? 'Paid' : 'Unpaid' }}
						<span class="text-muted">(No price set)</span>
					</span>
				</small>
			</div>
		</div>
		<b-button variant="link">
			<i class="fas fa-ellipsis-v" />
		</b-button>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	props: {
		attacks: {
			type: Array,
			default: () => [],
		},
	},
	computed: {
		...mapState('log', ['group', 'role']),
	},
};
</script>
