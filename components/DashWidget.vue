<template>
	<Card>
		<div class="card-body d-flex flex-column">
			<h6
				v-if="title"
				v-text="title"
			/>
			<h1
				v-if="number || number === 0"
				class="mb-0"
			>
				<span v-if="price">
					<small>$</small>&nbsp;{{ $price(v) }}
				</span>
				<span
					v-else
					v-text="v"
				/>
			</h1>
			<slot v-else />
		</div>
	</Card>
</template>

<script>
export default {
	props: {
		number: {
			type: Number,
			default: undefined,
		},
		price: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: '',
		},
	},
	computed: {
		v() {
			return Math.round(this.number * 10) / 10;
		},
	},
};
</script>
