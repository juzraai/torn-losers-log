<template>
	<div class="align-items-center d-flex list-group-item">
		<div class="font-weight-bold mr-2">
			<span
				class="badge badge-pill badge-danger mb-1"
				v-if="!a.paid"
			>Unpaid</span>
			<span
				class="badge badge-pill badge-success mb-1"
				v-else
			>Paid</span>
		</div>
		<div>
			You lost
			<span
				class="font-weight-bold"
				v-if="a.attacks"
			>{{ a.attacks.length }}x</span>
			to
			<Player :id="a.defender_id" />
			<a
				class="d-inline-block mx-1 text-secondary"
				:href="'https://www.torn.com/loader.php?sid=attackLog&ID=' + a.code"
				target="_blank"
			>
				<Timeago
					:auto-update="60"
					:datetime="a.timestamp_ended * 1000"
				/>
			</a>
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
						href="#"
					>All previous losses to this client are paid</a>
					<a
						class="dropdown-item"
						href="#"
					>All previous losses are paid</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// TODO proof will gen text, send it to List thru event, List will display it in a modal
import Player from "@/components/Player.vue";

export default {
	components: { Player },
	props: ["a"],
};
</script>


