<template>
	<Screen
		back-label="Back to log"
		back-to="/log"
		show-back
		title="Invoice"
	>
		<div
			v-if="attacks && attacks.length && result && role"
			class="row"
		>
			<div class="col-12">
				<p class="small">
					<strong>Invoice ID:</strong>
					{{ invoiceId }}
				</p>
			</div>
			<div class="col">
				<dl>
					<dt>Attacker</dt>
					<dd>
						<Player
							link
							:xid="attacker"
						/>
					</dd>

					<dt>Defender</dt>
					<dd>
						<Player
							link
							:xid="defender"
						/>
					</dd>

					<dt>Result</dt>
					<dd>{{ result }}</dd>
				</dl>
			</div>
			<div class="col">
				<dl>
					<dt>Attack #1</dt>
					<dd>{{ $timestamp(firstAttack.timestamp).replace(/^\w+ /, '') }}</dd>

					<dt>Attack #{{ attacks.length }}</dt>
					<dd>{{ $timestamp(lastAttack.timestamp).replace(/^\w+ /, '') }}</dd>

					<dt>Price</dt>
					<dd
						class="font-weight-bold"
						:class="lastAttack.paid ? 'text-success' : 'text-danger'"
					>
						$&nbsp;{{ $price(attacks.length * lastAttack.price) }}
						({{ $price(lastAttack.price) }}/ea)
					</dd>
				</dl>
			</div>
			<div class="col-12">
				<dl>
					<dt>TORN attack logs</dt>
					<dd>
						<ul class="d-md-none list-unstyled">
							<li
								v-for="(a, i) in attacks"
								:key="a.code"
								class="mb-1"
							>
								<strong>#{{ attacks.length - i }}</strong>
								{{ $timestamp(a.timestamp) }}
								<br>
								<a
									:href="'https://www.torn.com/loader.php?sid=attackLog&ID=' + a.code"
									target="_blank"
								>{{ a.code }}</a>
							</li>
						</ul>
						<table
							class="d-none d-md-table table table-bordered table-sm table-striped"
							:class="{ 'table-dark': darkMode }"
						>
							<thead>
								<tr>
									<th>#</th>
									<th>Timestamp</th>
									<th>Attack ID</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="(a, i) in attacks"
									:key="a.code"
								>
									<td class="text-right">{{ attacks.length - i }}</td>
									<td>{{ $timestamp(a.timestamp) }}</td>
									<td>
										<a
											:href="'https://www.torn.com/loader.php?sid=attackLog&ID=' + a.code"
											target="_blank"
										>{{ a.code }}</a>
									</td>
								</tr>
							</tbody>
						</table>
						<p class="small">
							TORN attack logs can be accessed by navigating to
							<br>
							https://www.torn.com/loader.php?sid=attackLog&ID=ATTACK_ID
						</p>
					</dd>
				</dl>
			</div>
		</div>
	</Screen>
</template>

<script>
import { mapState } from 'vuex';
import { RESULT, ROLE } from '~/services/database';
export default {
	head() {
		return {
			title: this.attacks ? `Invoice (${this.invoiceId})` : 'Invoice',
		};
	},
	computed: {
		...mapState('settings', ['darkMode', 'playerId']),
		attacks() {
			return this.$route.params.attacks;
		},
		attacker() {
			return this.role === ROLE.ATTACKER
				? this.playerId
				: this.attacks[0]?.opponentId;
		},
		defender() {
			return this.role === ROLE.DEFENDER
				? this.playerId
				: this.attacks[0]?.opponentId;
		},
		firstAttack() {
			return this.attacks[this.attacks.length - 1];
		},
		invoiceId() {
			return [
				this.attacker,
				this.defender,
				this.firstAttack.code.substr(0, 3),
				this.lastAttack.code.substr(0, 3),
			].join('-');
		},
		lastAttack() {
			return this.attacks[0];
		},
		result() {
			return this.$route.params.result === RESULT.LOST
				? 'Lost (or Timeout)'
				: 'Escape';
		},
		role() {
			return this.$route.params.role;
		},
	},
	beforeMount() {
		if (!this.attacks || !this.attacks.length || !this.result || !this.role) {
			this.$router.replace('/log');
		}
	},
};
</script>
