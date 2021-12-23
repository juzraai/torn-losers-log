<template>
	<div
		v-if="options.length"
		class="flex-grow-1"
	>
		<b-button
			v-if="option"
			v-b-tooltip.bottom
			block
			class="d-lg-none"
			size="lg"
			:title="option.tooltip"
			:variant="variant(option)"
			@click="toggle(option, true, $event)"
		>
			<i
				class="fa-fw"
				:class="option.icon"
			/>
		</b-button>
		<div class="d-none d-lg-block">
			<b-button-group
				size="lg"
				vertical
			>
				<b-button
					v-for="o in options"
					:key="o.value"
					v-b-tooltip.right
					:active="o.value === option.value"
					:title="o.tooltip"
					:variant="variant(o)"
					@click="toggle(o, false, $event)"
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
				return this.options.filter(o => o.value === this.value)[0] || {};
			}
		},
	},
	methods: {
		toggle(option, allowRotation, e) {
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
			(e?.path || []).forEach(el => el.blur && el.blur());
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
