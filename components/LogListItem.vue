<template>
	<div v-if="attacks[0]">
		<!-- xs & sm -->
		<div class="d-flex d-md-none flex-grow-1">
			<LogItemCell grow>
				<div class="d-flex flex-column">
					<div class="font-weight-bold">
						<span v-if="!isEvent">{{ attacks.length }}x</span>
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
			<LogItemDropdown
				:attacks="attacks"
				@openInvoice="openInvoice"
				@setPrice="$refs.priceModal.show()"
				@togglePaid="togglePaid"
			/>
		</div>

		<!-- md and up -->
		<div class="d-none d-md-flex flex-grow-1">
			<LogItemCell
				v-b-tooltip.right
				clickable
				title="Open invoice"
				@click="openInvoice"
			>
				<div
					v-if="!isEvent"
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
					:class="isAttacker ? 'flex-column' : 'flex-column-reverse'"
				>
					<div>{{ phrase }}</div>
					<Player
						class="font-weight-bold"
						link
						:xid="attacks[0].opponentId"
					/>
				</div>
			</LogItemCell>
			<LogItemCell
				v-b-tooltip.left
				clickable
				title="Set price"
				@click="$refs.priceModal.show()"
			>
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

		<b-modal
			ref="priceModal"
			centered
			footer-class="d-flex justify-content-between py-2"
			header-class="py-2"
			:modal-class="darkMode ? 'dark' : null"
			:ok-disabled="priceInput * 1000 === attacks[0].price"
			size="sm"
			title="Set price"
			@ok="updatePrices"
			@shown="initializePriceModal"
		>
			<template #default="{ ok }">
				<p class="text-justify">
					Specify a new price for
					{{ priceModalPhrase }}
					of
					<Player
						class="font-weight-bold"
						:xid="attacks[0].opponentId"
					/>
					starting
					<strong>
						from
						{{ $timestamp(attacks[attacks.length - 1].timestamp) }}.
					</strong>
				</p>
				<form @submit.prevent="ok">
					<b-form-group>
						<b-input-group
							append="k"
							prepend="$"
							size="lg"
						>
							<b-form-input
								v-model="priceInput"
								autofocus
								class="text-center"
								max="9999"
								min="0"
								placeholder="0"
								step="10"
								type="number"
							/>
						</b-input-group>
					</b-form-group>
				</form>
				<p
					v-if="priceInput * 1000 !== attacks[0].price"
					class="text-danger text-justify"
				>Prices of similar and newer attacks will be <strong>overwritten!</strong></p>
			</template>
		</b-modal>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import DB, { GROUPING, RESULT, ROLE } from '@/services/database';

export default {
	props: {
		attacks: {
			type: Array,
			default: () => [],
		},
	},
	data: () => ({
		priceInput: 0,
	}),
	computed: {
		...mapState('log', ['group', 'result', 'role']),
		...mapState('settings', ['darkMode']),
		isAttacker() {
			return this.role === ROLE.ATTACKER;
		},
		isEvent() {
			return this.group === GROUPING.EVENT;
		},
		phrase() {
			const action = this.result === RESULT.LOST ? 'lost to' : 'escaped from';
			return this.role === ROLE.ATTACKER ? `You ${action}` : `${action} you`;
		},
		priceModalPhrase() {
			const direction = this.role === ROLE.ATTACKER ? 'outgoing' : 'incoming';
			const outcome = this.result === RESULT.LOST ? 'losses' : 'escapes';
			return `${direction} ${outcome}`;
		},
	},
	methods: {
		...mapMutations('ui', ['SET_LOADING']),
		initializePriceModal() {
			this.priceInput = this.attacks[0].price
				? this.attacks[0].price / 1000
				: null;
		},
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
		openInvoice() {
			this.$router.push({
				name: 'invoice',
				params: {
					attacks: this.attacks,
					result: this.result,
					role: this.role,
				},
			});
		},
		togglePaid() {
			if (this.attacks[0].paid) {
				this.markUnpaidFrom();
			} else {
				this.markPaidUntil();
			}
		},
		async updatePrices() {
			const newPrice = Math.max(0, this.priceInput) * 1000;
			if (this.attacks[0].price !== newPrice) {
				this.SET_LOADING(true);
				await DB.setPriceFrom(this.role, this.result, this.attacks, newPrice);
				this.$emit('attacksUpdated');
				this.SET_LOADING(false);
			}
		},
	},
};
</script>
