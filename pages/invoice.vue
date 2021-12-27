<template>
	<Screen
		back-label="Back to log"
		back-to="/log"
		show-back
		title="Invoice"
	>
		<div
			v-if="attacks && attacks.length && result && role"
			ref="invoice"
			class="row"
		>
			<div class="col-12">
				<p class="small">
					<strong>Invoice ID:</strong>
					{{ censored ? '000000-000000-abc-abc' : invoiceId }}
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
						$&nbsp;{{ censored ? 'xxxM' : $price(attacks.length * lastAttack.price) }}
						({{ censored ? 'xxxk' : $price(lastAttack.price) }}/ea)
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
								>{{ censored ? 'abcdef0123456789' : a.code }}</a>
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
										>{{ censored ? 'abcdef012345678xxabcdef012345678' : a.code }}</a>
									</td>
								</tr>
							</tbody>
						</table>
						<p class="small">
							All displayed timestamps are in TORN City Time (TCT; same as UTC or GMT).
						</p>
						<p class="small">
							TORN attack logs can be accessed by navigating to
							<br>
							https://www.torn.com/loader.php?sid=attackLog&ID=ATTACK_ID
						</p>
						<p class="border-top pt-2 small">
							Generated via <strong>TLL (TORN City Losers' Log)</strong> developed by
							<Player
								class="font-weight-bold"
								link
								:xid="2413874"
							/>
						</p>
					</dd>
				</dl>
			</div>
		</div>
		<template #footer>
			<b-button
				variant="primary"
				@click="exportXLSX"
			>
				<i class="fas fa-file-excel fa-fw mr-1" />
				<span class="d-none d-sm-inline">Download in</span>
				XLSX
			</b-button>
			<b-button
				variant="primary"
				@click="exportJPG"
			>
				<i class="fas fa-file-image fa-fw mr-1" />
				<span class="d-none d-sm-inline">Download as</span>
				JPG
			</b-button>
		</template>
	</Screen>
</template>

<script>
import sleep from 'await-sleep';
import domtoimage from 'dom-to-image';
import writeXlsxFile from 'write-excel-file';
import { mapMutations, mapState } from 'vuex';
import DB, { RESULT, ROLE } from '~/services/database';

export default {
	head() {
		return {
			title: this.attacks ? `Invoice (${this.invoiceId})` : 'Invoice',
		};
	},
	computed: {
		...mapState('settings', ['darkMode', 'playerId']),
		...mapState('ui', ['censored']),
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
		filename() {
			return `tll-invoice-${this.invoiceId}`;
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
	methods: {
		...mapMutations('settings', ['SET_DARK_MODE']),
		async exportJPG() {
			const prevDarkMode = this.darkMode;
			if (prevDarkMode) {
				this.SET_DARK_MODE(false);
				await sleep(500); // wait out DOM reaction & transition... not so elegant, I know
			}
			const dataUrl = await domtoimage.toJpeg(this.$refs.invoice, {
				bgcolor: 'white',
				quality: 0.95,
				width: 600,
			});
			if (prevDarkMode) {
				this.SET_DARK_MODE(prevDarkMode);
			}
			const link = document.createElement('a');
			link.download = `${this.filename}.jpg`;
			link.href = dataUrl;
			link.click();
		},
		async exportXLSX() {
			const playerIds = [this.attacker, this.defender];
			const playerNames = {};
			await Promise.all(
				playerIds.map(async id => {
					const player = await DB.getPlayer(id);
					playerNames[id] = player.name;
				})
			);

			const header =
				'No.|Timestamp (TCT)|Attack log link|Attacker|Defender|Result|Price'
					.split('|')
					.map(value => ({ value, fontWeight: 'bold' }));

			const data = [header];
			this.attacks.forEach((a, i) => {
				data.push(
					[
						this.attacks.length - i,
						this.$timestamp(a.timestamp),
						`https://www.torn.com/loader.php?sid=attackLog&ID=${a.code}`,
						`${playerNames[this.attacker]} [${this.attacker}]`,
						`${playerNames[this.defender]} [${this.defender}]`,
						this.result,
						a.price,
					].map(value => ({ value }))
				);
			});

			await writeXlsxFile(data, {
				fileName: `${this.filename}.xlsx`,
				sheet: `TLL Invoice ${this.invoiceId}`,
			});
		},
	},
};
</script>
