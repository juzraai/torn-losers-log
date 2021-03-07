<template>
	<div
		class="align-items-center d-flex list-group-item px-2 py-1"
		:class="{ 'bg-light': a.paid, 'text-muted': a.paid }"
	>
		<small class="mr-2 text-muted">
			{{ formatTimestamp(a.timestamp_ended) }}
			<span v-if="a.timestamp_started">
				<br>
				{{ formatTimestamp(a.timestamp_started) }}
			</span>
		</small>
		<div>

			You lost
			<strong v-if="a.attacks">{{ a.attacks.length }}x</strong>
			to
			<Player
				:id="a.defender_id"
				:variant="a.paid ? 'muted' :'dark'"
			/>
			<span
				class="ml-2 text-success"
				v-if="a.paid"
			>
				<i class="fas fa-fw fa-dollar-sign"></i>
				<strong>Paid</strong>
			</span>
		</div>
		<div class="ml-auto my-1">
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
import moment from 'moment';
import { mapActions } from "vuex";
import Player from "@/components/Player.vue";

export default {
	components: { Player },
	props: ["a"],
	methods: {
		...mapActions(["markAsPaid", "markAsUnpaid"]),
		formatTimestamp(t) {
			return moment(t * 1000).utcOffset(0).format('HH:mm:ss DD/MM/YY')
		}
	},
};
</script>


