<template>
	<div class="card shadow">
		<div class="card-body py-2">
			<b-form-group
				v-slot="{ ariaDescribedby }"
				class="mb-0"
				label="Your role:"
			>
				<b-form-radio-group
					v-model="model"
					:aria-describedby="ariaDescribedby"
					:button-variant="darkMode ? 'outline-secondary' : 'outline-primary'"
					buttons
					name="role-filter"
					:options="options"
					size="lg"
				/>
			</b-form-group>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
	data: () => ({
		options: [
			{ html: '<i class="fas fa-crosshairs fa-fw" />', value: 'attacker' },
			{ html: '<i class="fas fa-shield-alt fa-fw" />', value: 'defender' },
		],
	}),
	computed: {
		...mapState('log', ['role']),
		...mapState('settings', ['darkMode']),
		model: {
			get() {
				return this.role;
			},
			set(value) {
				this.SET_ROLE(value);
			},
		},
	},
	methods: {
		...mapMutations('log', ['SET_ROLE']),
	},
};
</script>
