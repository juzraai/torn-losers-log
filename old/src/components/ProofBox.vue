<template>
	<div class="bg-light m-3 overflow-auto p-3 pb-0 proof-box rounded small">
		<dl class="mb-0">
			<dt>Attacker</dt>
			<dd>
				<Player :id="playerId" />
			</dd>

			<dt>Defender</dt>
			<dd>
				<Player :id="entry.defender_id" />
			</dd>

			<dt>Loss count</dt>
			<dd>{{ entry.attacks ? entry.attacks.length : 1 }}</dd>

			<dt>Price</dt>
			<dd>${{ formatPrice(entry.price) }} x {{ entry.attacks ? entry.attacks.length : 1 }} = ${{ formatPrice(entry.price * (entry.attacks ? entry.attacks.length : 1)) }} </dd>

			<dt>Attack logs</dt>
			<dd class="mb-0">
				<ul class="list-unstyled mb-0">
					<li v-if="!entry.attacks">
						<ProofLine
							:attack="entry"
							:number="1"
						/>
					</li>
					<li
						:key="a.code"
						v-for="(a, i) in entry.attacks"
					>
						<ProofLine
							:attack="a"
							:number="entry.attacks.length -i"
						/>
					</li>
				</ul>
			</dd>
		</dl>
	</div>
</template>

<script>
import { mapState } from "vuex";
import Player from "@/components/Player.vue";
import ProofLine from "@/components/ProofLine.vue";
import { formatPrice } from "@/services/tornFormat.js";

export default {
	props: ["entry"],
	components: { Player, ProofLine },
	computed: {
		...mapState(["playerId"]),
	},
	methods: {
		formatPrice,
	},
};
</script>

<style>
.proof-box {
	max-height: 300px;
}
</style>
