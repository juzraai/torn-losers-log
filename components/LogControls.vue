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
			/>

			<SwitchButton
				v-model="resultFilter"
				:options="resultOptions"
			/>

			<SwitchButton
				v-model="groupMode"
				:options="groupOptions"
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
		groupOptions: [
			{
				icon: 'fas fa-bars',
				tooltip: 'Events',
				value: 'event',
			},
			{
				icon: 'fas fa-th-list',
				tooltip: 'Sessions',
				value: 'session',
			},
			{
				icon: 'fas fa-users',
				tooltip: 'Contracts',
				value: 'contract',
			},
		],
		paidOptions: [
			{
				icon: 'fas fa-check',
				tooltip: 'Show paid attacks?',
			},
		],
		resultOptions: [
			{
				icon: 'fas fa-skull',
				tooltip: 'List losses',
				value: 'Lost',
			},
			{
				icon: 'fas fa-running',
				tooltip: 'List escapes',
				value: 'Escape',
			},
		],
		roleOptions: [
			{
				icon: 'fas fa-crosshairs',
				tooltip: 'You attack',
				value: 'attacker',
			},
			{
				icon: 'fas fa-shield-alt',
				tooltip: 'You defend',
				value: 'defender',
			},
		],
	}),
	computed: {
		...mapState('log', ['group', 'paid', 'result', 'role']),
		groupMode: {
			get() {
				return this.group;
			},
			set(value) {
				this.SET_GROUP(value);
			},
		},
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
		...mapMutations('log', ['SET_GROUP', 'SET_PAID', 'SET_RESULT', 'SET_ROLE']),
	},
};
</script>
