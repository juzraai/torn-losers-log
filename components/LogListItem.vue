<template>
	<div class="d-flex align-items-center gap">
		<div
			v-if="group !== 'event'"
			class="font-weight-bold lead text-right"
			style="min-width: 35px;"
		>
			{{ attacks.length }}x
		</div>
		<p
			v-if="attacks[0]"
			class="flex-grow-1 m-0"
		>
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
			<small>
				<span
					v-if="attacks[0].price"
					:class="attacks[0].paid ? 'text-success' : 'text-danger'"
				>
					${{ attacks[0].price * attacks.length }} (${{ attacks[0].price }} each)
				</span>
				<span
					v-else
					class="text-muted"
				>
					(No price set)
				</span>
			</small>
		</p>
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
