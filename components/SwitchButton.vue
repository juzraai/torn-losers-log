<template>
	<div>
		<b-button
			v-b-tooltip.html.bottom
			class="d-lg-none"
			size="lg"
			:title="tooltip"
			:variant="variant(option)"
			@click="toggle(option, true)"
		>
			<i
				class="fa-fw"
				:class="option.icon"
			/>
		</b-button>
		<div class="d-none d-lg-block">
			<b-button-group
				v-b-tooltip.html.right
				size="lg"
				:title="tooltip ? `<div class='text-left'>${tooltip}</div>` : undefined"
				vertical
			>
				<b-button
					v-for="o in options"
					:key="o.value"
					:active="o.value === option.value"
					:variant="variant(o)"
					@click="toggle(o)"
				>
					<i
						class="fa-fw"
						:class="o.icon"
					/>
				</b-button>
			</b-button-group>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		options: {
			type: Array,
			default: () => [],
		},
		tooltip: {
			type: String,
			default: undefined,
		},
		value: {
			type: [Boolean, String],
			default: () => false,
		},
	},
	computed: {
		option() {
			// option to show in single button mode
			if (this.options.length === 1) {
				// checkbox mode: show only option regardless
				return this.options[0];
			} else {
				// radio mode: show selected option
				return this.options.filter(o => o.value === this.value)[0];
			}
		},
	},
	methods: {
		toggle(option, allowRotation) {
			if (this.options.length === 1) {
				// checkbox
				this.$emit('input', !this.value);
			} else if (option.value === this.value && allowRotation) {
				// radio + single button mode: rotates values
				const i = this.options.indexOf(option);
				const nextIndex = (i + 1) % this.options.length;
				const nextOption = this.options[nextIndex];
				this.$emit('input', nextOption.value);
			} else {
				// radio, traditional mechanism
				this.$emit('input', option.value);
			}
		},
		variant(option) {
			const ov = this.options.length === 1 ? true : option.value;
			const outline = ov === this.value ? '' : 'outline-';
			const theme = 'primary';
			return `${outline}${theme}`;
		},
	},
};
</script>
