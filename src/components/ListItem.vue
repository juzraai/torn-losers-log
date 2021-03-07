<template>
	<div
		class="align-items-center d-flex list-group-item py-2"
		:class="{ 'bg-light': a.paid, 'text-muted': a.paid }"
	>
		<div>
			You lost
			<strong v-if="a.attacks">{{ a.attacks.length }}x</strong>
			to
			<Player
				:id="a.defender_id"
				:variant="a.paid ? 'muted' :'dark'"
			/>
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
			<!--<button class="btn btn-sm btn-outline-info mx-1">Proof</button>-->
			<button
				class="btn btn-sm btn-outline-success mx-1"
				v-if="!a.paid"
				@click="markAsPaid(a)"
			>Paid</button>
			<button
				class="btn btn-sm btn-outline-danger mx-1"
				v-else
				@click="markAsUnpaid(a)"
			>Unpaid</button>
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
		...mapActions(["markAsPaid", "markAsUnpaid"]),
	},
};
</script>


