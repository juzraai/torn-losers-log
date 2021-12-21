<template>
	<Card>
		<div class="card-body d-flex flex-row flex-lg-column flex-wrap gap p-2">
			<b-button
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
		...mapMutations('log', ['SET_GROUP', 'SET_LAST_UPDATED', 'SET_PAID', 'SET_RESULT', 'SET_ROLE']),
		...mapMutations('ui', ['SET_LOADING']),
		async updateAttacks() {
			this.SET_LOADING(true);
			await UPDATER.updateAttacks();
			this.SET_LAST_UPDATED(new Date().getTime());
			this.SET_LOADING(false);
		}
	},
};
</script>
