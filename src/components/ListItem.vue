<template>
	<div class="align-items-center d-flex list-group-item py-2" :class="{ 'bg-light': a.paid }">
		<!--<div class="font-weight-bold mr-2">
			<span
				class="badge badge-pill badge-danger mb-1"
				v-if="!a.paid"
			>Unpaid</span>
			<span
				class="badge badge-pill badge-success mb-1"
				v-else
			>Paid</span>
		</div>-->
		<div>
			You lost
			<strong v-if="a.attacks">{{ a.attacks.length }}x</strong>
			to
			<Player :id="a.defender_id" />
			<Timeago
				:auto-update="60"
				:datetime="a.timestamp_ended * 1000"
			/>
			<span
				class="ml-2 text-success"
				v-if="a.paid"
			>
				<i class="fas fa-fw fa-dollar-sign"></i>
				<strong>Paid</strong>
			</span>
		</div>
		<div class="ml-auto">
			<button class="btn btn-sm btn-outline-info mx-1">Proof</button>
			<div
				class="btn-group mx-1"
				v-if="!a.paid"
			>
				<button
					type="button"
					class="btn btn-sm btn-outline-success"
					@click="doSetPaid(!a.paid)"
				>Paid</button>
				<button
					type="button"
					class="btn btn-sm btn-outline-success dropdown-toggle dropdown-toggle-split"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					<span class="sr-only">Paid options</span>
				</button>
				<div class="dropdown-menu dropdown-menu-right">
					<a
						class="dropdown-item"
						href="javascript:void(0)"
					>All previous losses to this client are paid</a>
					<a
						class="dropdown-item"
						href="javascript:void(0)"
					>All previous losses are paid</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import Player from "@/components/Player.vue";

export default {
	components: { Player },
	props: ["a"],
	methods: {
		...mapActions(["setPaid"]),
		doSetPaid(paid, prevsFromDefender, allPrevs) {
			this.setPaid({ paid, attackOrGroup: this.a, prevsFromDefender, allPrevs });
		},
	},
};
</script>


