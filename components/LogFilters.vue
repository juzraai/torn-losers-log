<template>
	<Card>
		<div class="card-body d-flex flex-row flex-lg-column flex-wrap gap">
			<b-form-group
				v-slot="{ ariaDescribedby }"
				class="mb-0"
			>
				<b-form-radio-group
					v-model="roleFilter"
					:aria-describedby="ariaDescribedby"
					:button-variant="darkMode ? 'outline-secondary' : 'outline-primary'"
					buttons
					name="role-filter"
					:options="roleOptions"
					size="lg"
				/>
			</b-form-group>
			<b-form-group
				v-slot="{ ariaDescribedby }"
				class="mb-0"
			>
				<b-form-radio-group
					v-model="resultFilter"
					:aria-describedby="ariaDescribedby"
					:button-variant="darkMode ? 'outline-secondary' : 'outline-primary'"
					buttons
					name="result-filter"
					:options="resultOptions"
					size="lg"
				/>
			</b-form-group>
		</div>
	</Card>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
	data: () => ({
		resultOptions: [
			{ html: '<i class="fas fa-skull fa-fw" />', value: 'Lost' },
			{ html: '<i class="fas fa-running fa-fw" />', value: 'Escape' },
		],
		roleOptions: [
			{ html: '<i class="fas fa-crosshairs fa-fw" />', value: 'attacker' },
			{ html: '<i class="fas fa-shield-alt fa-fw" />', value: 'defender' },
		],
	}),
	computed: {
		...mapState('log', ['result', 'role']),
		...mapState('settings', ['darkMode']),
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
	},
	methods: {
		...mapMutations('log', ['SET_RESULT', 'SET_ROLE']),
	},
};
</script>
