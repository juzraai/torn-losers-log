<template>
	<div v-if="attacks[0]">
		<!-- xs & sm -->
		<div class="d-flex d-md-none flex-grow-1">
			<LogItemCell grow>
				<div class="d-flex flex-column">
					<div class="font-weight-bold">
						<span v-if="group !== 'event'">{{ attacks.length }}x</span>
						<Player
							link
							:xid="attacks[0].opponentId"
						/>
					</div>
					<div style="font-size: 90%;">
						<span class="d-sm-none text-muted">{{ $timestamp(attacks[0].timestamp).replace(/^\w+ |\/\d+$/g, '') }} |</span>
						<span class="d-none d-sm-inline text-muted">{{ $timestamp(attacks[0].timestamp) }} |</span>
						<LogItemPrice :attacks="attacks" />
					</div>
				</div>
			</LogItemCell>
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

		<!-- md and up -->
		<div class="d-none d-md-flex flex-grow-1">
			<LogItemCell clickable>
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
					<div>{{ $timestamp(attacks[0].timestamp) }}</div>
					<div v-if="attacks.length > 1">
						{{ $timestamp(attacks[attacks.length - 1].timestamp) }}
					</div>
				</div>
			</LogItemCell>
			<LogItemCell grow>
				<div
					class="d-flex"
					:class="role === 'attacker' ? 'flex-column' : 'flex-column-reverse'"
				>
					<div>{{ phrase }}</div>
					<Player
						class="font-weight-bold"
						link
						:xid="attacks[0].opponentId"
					/>
				</div>
			</LogItemCell>
			<LogItemCell clickable>
				<LogItemPrice
					:attacks="attacks"
					class="text-right"
					style="min-width: 100px;"
				/>
			</LogItemCell>
			<LogItemPaidButton
				:attacks="attacks"
				@click="togglePaid"
			/>
		</div>
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
		...mapState('log', ['group', 'result', 'role']),
		phrase() {
			const action =
				this.result === 'Lost' ? 'lost to' : 'escaped from';
			return this.role === 'attacker' ? `You ${action}` : `${action} you`;
		},
	},
	methods: {
		...mapMutations('ui', ['SET_LOADING']),
		async markPaidUntil() {
			this.SET_LOADING(true);
			await DB.markPaidUntil(this.role, this.result, this.attacks);
			this.$emit('attacksUpdated');
			this.SET_LOADING(false);
		},
		async markUnpaidFrom() {
			this.SET_LOADING(true);
			await DB.markUnpaidFrom(this.role, this.result, this.attacks);
			this.$emit('attacksUpdated');
			this.SET_LOADING(false);
		},
		togglePaid() {
			if (this.attacks[0].paid) {
				this.markUnpaidFrom();
			} else {
				this.markPaidUntil();
			}
		},
	},
};
</script>
