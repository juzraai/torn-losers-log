<template>
	<div
		v-if="attacks[0]"
		class="d-flex align-items-center gap"
	>
		<div
			v-if="group !== 'event'"
			class="font-weight-bold lead text-right"
			style="min-width: 45px;"
		>
			{{ attacks.length }}x
		</div>
		<div
			class="d-none d-md-block text-muted"
			style="min-width: 200px;"
		>
			{{ $timestamp(attacks[0].timestamp_ended) }}
			<span v-if="attacks.length > 1">
				<br>
				{{ $timestamp(attacks[attacks.length - 1].timestamp_ended) }}
			</span>
		</div>
		<div class="d-flex flex-column flex-grow-1">
			<div class="d-md-none small text-muted">
				{{ $timestamp(attacks[0].timestamp_ended) }}
			</div>
			<div>
				<span v-if="role === 'attacker'">
					<span class="d-none d-md-inline">
						You
						{{ attacks[0].result === 'Lost' ? 'lost to' : 'escaped from' }}
						<br>
					</span>
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
					<span class="d-none d-md-inline">
						<br>
						{{ attacks[0].result === 'Lost' ? 'lost to' : 'escaped from' }}
						you
					</span>
				</span>
			</div>
			<div
				class="d-md-none small"
				:class="attacks[0].paid ? 'text-success' : 'text-danger'"
			>
				<span v-if="attacks[0].price">
					<strong>$ {{ $price(attacks[0].price * attacks.length) }}</strong>
					({{ $price(attacks[0].price) }}/ea)
				</span>
				<span
					v-else
					v-b-tooltip.left
					title="No price set"
				>
					{{ attacks[0].paid ? 'Paid' : 'Unpaid' }}
				</span>
			</div>
		</div>
		<div
			class="d-none d-md-block text-right"
			:class="attacks[0].paid ? 'text-success' : 'text-danger'"
		>
			<span v-if="attacks[0].price">
				<strong>$ {{ $price(attacks[0].price * attacks.length) }}</strong>
				<br>
				({{ $price(attacks[0].price) }}/ea)
			</span>
			<span
				v-else
				v-b-tooltip.left
				title="No price set"
			>
				{{ attacks[0].paid ? 'Paid' : 'Unpaid' }}
			</span>
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
