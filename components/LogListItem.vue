<template>
	<div
		v-if="attacks[0]"
		class="align-items-center d-flex gap"
	>
		<!-- xs & sm -->
		<div class="d-flex d-md-none flex-column flex-grow-1">
			<div class="font-weight-bold">
				{{ attacks.length }}x
				<Player
					link
					:xid="xid"
				/>
			</div>
			<div style="font-size: 90%;">
				<span class="d-sm-none text-muted">{{ $timestamp(attacks[0].timestamp_ended).replace(/^\w+ |\/\d+$/g, '') }} |</span>
				<span class="d-none d-sm-inline text-muted">{{ $timestamp(attacks[0].timestamp_ended) }} |</span>
				<LogItemPrice :attacks="attacks" />
			</div>
		</div>

		<!-- md and up -->
		<div class="align-items-center d-none d-md-flex flex-grow-1 gap">
			<div
				v-if="group !== 'event'"
				class="font-weight-bold lead text-right"
				style="min-width: 45px;"
				v-text="`${attacks.length}x`"
			/>
			<div
				class="d-flex flex-column text-muted"
				style="min-width: 200px;"
			>
				<div>{{ $timestamp(attacks[0].timestamp_ended) }}</div>
				<div v-if="attacks.length > 1">
					{{ $timestamp(attacks[attacks.length - 1].timestamp_ended) }}
				</div>
				<div class="text-danger">{{ attacks[0].session % 10000 }}</div>
			</div>
			<div
				class="d-flex flex-grow-1"
				:class="role === 'attacker' ? 'flex-column' : 'flex-column-reverse'"
			>
				<div>{{ phrase }}</div>
				<Player
					class="font-weight-bold"
					link
					:xid="xid"
				/>
			</div>
			<LogItemPrice
				:attacks="attacks"
				class="text-right"
			/>
		</div>

		<b-dropdown
			dropleft
			no-caret
			variant="link"
		>
			<template #button-content>
				<i class="fas fa-ellipsis-v" />
			</template>
			<b-dropdown-item-button
				v-if="attacks[0].paid"
				@click="markUnpaidFrom"
			>
				Mark this and newer attacks<br>
				of this player as <strong class="text-danger">unpaid</strong>
			</b-dropdown-item-button>
			<b-dropdown-item-button
				v-else
				@click="markPaidUntil"
			>
				Mark this and older attacks<br>
				of this player as <strong class="text-success">paid</strong>
			</b-dropdown-item-button>
		</b-dropdown>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import DB from '@/services/database';

export default {
	props: {
		attacks: {
			type: Array,
			default: () => [],
		},
	},
	computed: {
		...mapState('log', ['group', 'role']),
		phrase() {
			const action =
				this.attacks[0].result === 'Lost' ? 'lost to' : 'escaped from';
			return this.role === 'attacker' ? `You ${action}` : `${action} you`;
		},
		xid() {
			return this.role === 'attacker'
				? this.attacks[0].defender_id
				: this.attacks[0].attacker_id;
		},
	},
	methods: {
		...mapMutations('ui', ['SET_LOADING']),
		markPaidUntil() {
			this.SET_LOADING(true);
			DB.markPaidUntil(this.attacks);
			this.$emit('attacksUpdated');
			this.SET_LOADING(false);
		},
		markUnpaidFrom() {
			this.SET_LOADING(true);
			DB.markUnpaidFrom(this.attacks);
			this.$emit('attacksUpdated');
			this.SET_LOADING(false);
		},
	},
};
</script>
