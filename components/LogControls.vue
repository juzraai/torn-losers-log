<template>
	<Card>
		<div
			id="log-controls"
			class="card-body d-flex flex-row flex-lg-column p-0 p-md-2"
		>
			<b-button
				v-if="!updateIntervalMs"
				class="flex-grow-1"
				size="lg"
				variant="primary"
				@click="updateAttacks"
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
				:disabled="isDaysGrouping"
				:options="paidOptions"
			/>
		</div>
	</Card>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { GROUPING, RESULT, ROLE } from '@/services/database';
import UPDATER from '@/services/updater';

export default {
	data: () => ({
		groupOptions: [
			{
				icon: 'fas fa-bars',
				tooltip: 'Events',
				value: GROUPING.EVENT,
			},
			{
				icon: 'fas fa-th-list',
				tooltip: 'Sessions',
				value: GROUPING.SESSION,
			},
			{
				icon: 'fas fa-users',
				tooltip: 'Contracts',
				value: GROUPING.CONTRACT,
			},
			{
				icon: 'far fa-chart-bar',
				tooltip: 'Statistics',
				value: GROUPING.DAYS,
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
				value: RESULT.LOST,
			},
			{
				icon: 'fas fa-running',
				tooltip: 'List escapes',
				value: RESULT.ESCAPE,
			},
		],
		roleOptions: [
			{
				icon: 'fas fa-crosshairs',
				tooltip: 'You attack',
				value: ROLE.ATTACKER,
			},
			{
				icon: 'fas fa-shield-alt',
				tooltip: 'You defend',
				value: ROLE.DEFENDER,
			},
		],
	}),
	computed: {
		...mapState('log', ['group', 'paid', 'result', 'role']),
		...mapState('settings', ['updateIntervalMs']),
		groupMode: {
			get() {
				return this.group;
			},
			set(value) {
				this.SET_GROUP(value);
			},
		},
		isDaysGrouping() {
			return this.group === GROUPING.DAYS;
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
		...mapMutations('log', [
			'SET_GROUP',
			'SET_PAID',
			'SET_RESULT',
			'SET_ROLE',
		]),
		...mapMutations('ui', ['SET_LOADING']),
		async updateAttacks() {
			this.SET_LOADING(true);
			if (!await UPDATER.updateAttacks()) {
				this.errorToast('TORN API returned no attacks. See developer console for error.');
			}
			this.SET_LOADING(false);
		},
	},
};
</script>
