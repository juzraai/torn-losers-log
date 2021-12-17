<template>
	<Card>
		<div class="card-body d-flex flex-row flex-lg-column flex-wrap gap">
			<b-button
				disabled
				size="lg"
				variant="primary"
			>
				<i class="fas fa-sync fa-fw" />
			</b-button>

			<SwitchButton
				v-model="roleFilter"
				:options="roleOptions"
				:tooltip="'Your role:<br><strong>attacker</strong> or <strong>defender</strong>'"
			/>

			<SwitchButton
				v-model="resultFilter"
				:options="resultOptions"
				:tooltip="'Attack result:<br><strong>Lost</strong> or <strong>Escape</strong>'"
			/>

			<SwitchButton
				v-model="showPaid"
				:options="paidOptions"
			/>
		</div>
	</Card>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
	data: () => ({
		paidOptions: [
			{
				icon: 'fas fa-check',
			},
		],
		resultOptions: [
			{
				icon: 'fas fa-skull',
				value: 'Lost',
			},
			{
				icon: 'fas fa-running',
				value: 'Escape',
			},
		],
		roleOptions: [
			{
				icon: 'fas fa-crosshairs',
				value: 'attacker',
			},
			{
				icon: 'fas fa-shield-alt',
				value: 'defender',
			},
		],
	}),
	computed: {
		...mapState('log', ['paid', 'result', 'role']),
		resultFilter: {
			get() {
				return this.result;
			},
			set(value) {
				this.SET_RESULT(value);
			},
		},
		roleFilter: {
			get() {
				return this.role;
			},
			set(value) {
				this.SET_ROLE(value);
			},
		},
		showPaid: {
			get() {
				return this.paid;
			},
			set(value) {
				this.SET_PAID(value);
			},
		},
	},
	methods: {
		...mapMutations('log', ['SET_PAID', 'SET_RESULT', 'SET_ROLE']),
	},
};
</script>
