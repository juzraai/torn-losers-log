<template>
	<Screen
		back-label="Back to log"
		back-to="/log"
		show-back
		title="Help"
	>
		<h3>Log controls</h3>

		<section class="mb-5">
			<p>On the log page you see this control panel (on desktop screens it is displayed vertically on the left):</p>
			<LogControlsMockup />
			<p>The behavior of these buttons are explained below separately.</p>
		</section>

		<section
			v-for="(b, i) in buttons"
			:key="i"
			class="mb-5"
		>
			<LogControlsMockup :selected="i" />
			<p v-html="b.description" />
			<ul
				v-if="b.options"
				class="list-unstyled m-3 mt-0"
			>
				<li
					v-for="(o, j) in b.options"
					:key="j"
					class="align-items-start d-flex mb-2"
				>
					<span class="bg-primary mr-3 px-2 py-1 rounded text-white">
						<i
							class="fa-fw"
							:class="o.icon"
						/>
					</span>
					<span
						class="mt-1"
						v-html="o.description"
					/>
				</li>
			</ul>
		</section>

		<h3>List items</h3>

		<p>List items on the log page display either individual attacks or attack groups. Each list item shows the following:</p>
		<ul>
			<li>number of attacks in the group (hidden in "event" mode)</li>
			<li>timestamps of the first and last attack in the group, most recent timestamp at the top (on smaller screens, only the most recent timestamp is displayed)</li>
			<li>direction, outcome and opponent of attacks in the group</li>
			<li>total and per-attack price (if set) of the attack group, <strong><span class="text-danger">red means unpaid,</span> <span class="text-success">green means paid</span></strong></li>
		</ul>
		<p>On desktop screens, the list is displayed as a table, where some cells have click actions.</p>
		<ul>
			<li>The cell which displays the attack count and timestamps <strong>opens the invoice</strong> for the attack group.</li>
			<li>Clicking the price cell will display a dialog where you can <strong>set the price for the attack group and all newer attacks of that opponent.</strong></li>
			<li>There's an addiitonal cell which displays the paid status. Clicking on it will <strong>toggle the paid status</strong> of the attack group and other attacks too. <strong>Setting an attack group paid will set all previous attacks of that type and opponent also as paid. Setting an attack (group) unpaid will set all newer attacks of that type and opponent also as unpaid.</strong></li>
		</ul>
		<p>On smaller screens, the list displayed in a compact form and these actions can be accessed via the dropdown menu (<i class="fas fa-ellipsis-v fa-fw" />) on the right.</p>

		<template #footer>
			<b-button
				class="mx-auto"
				to="/log"
				variant="link"
			>
				Back to log
			</b-button>
		</template>
	</Screen>
</template>

<script>
export default {
	data() {
		const switchDescription =
			'On smaller screens, a single blue button is displayed which shows the currently selected option, and it rotates the options when you click it. On desktop screens, all options are displayed as separate buttons and the selected one is marked with blue background.';

		const buttons = [
			{
				description:
					'This button <strong>updates the attack list.</strong> It fetches your last 1000 attacks from TORN, stores losses and escapes in your browser, then refreshes the UI. Timed out attacks are considered as losses. In the settings (<i class="fas fa-fw fa-cog"></i>) you can turn on automatic updating, in which case this button is hidden.',
			},
			{
				description: `This button <strong>toggles attack direction filter.</strong> ${switchDescription}`,
				options: [
					{
						icon: 'fas fa-crosshairs',
						description:
							'You are the attacker, <strong>outgoing attacks</strong> are listed',
					},
					{
						icon: 'fas fa-shield-alt',
						description:
							'You are the defender, <strong>incoming attacks</strong> are listed',
					},
				],
			},
			{
				description: `This button <strong>toggles attack result (outcome) filter.</strong> ${switchDescription}`,
				options: [
					{
						icon: 'fas fa-skull',
						description:
							'<strong>Losses</strong> (including timeouts) are listed',
					},
					{
						icon: 'fas fa-running',
						description: '<strong>Escapes</strong> are listed',
					},
				],
			},
			{
				description: `This button <strong>toggles attack grouping mode.</strong> ${switchDescription}`,
				options: [
					{
						icon: 'fas fa-bars',
						description:
							'Event mode: lists attacks <strong>individually</strong>.',
					},
					{
						icon: 'fas fa-th-list',
						description:
							'Session mode: groups <strong>consecutive</strong> attacks with the same opponent, price and paid status are grouped.',
					},
					{
						icon: 'fas fa-users',
						description:
							'Contract mode: groups attacks with the same opponent, price and paid status are grouped, <strong>regardless of timestamp.</strong>',
					},
					{
						icon: 'far fa-chart-bar',
						description:
							'Statistics mode: shows <strong>KPIs</strong> and an attack chart for the past 31 days.',
					},
				],
			},
			{
				description:
					'This button <strong>toggles whether paid attacks are displayed.</strong> If its background is not blue, only unpaid attacks are displayed.',
			},
		];
		return {
			buttons,
			switchDescription,
		};
	},
};
</script>

<style scoped>
li,
p {
	text-align: justify;
}
</style>
