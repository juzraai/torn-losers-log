<template>
	<div class="list-group-item px-2 py-1">
		<div class="align-items-center d-flex">
			<LogEntryTimestamp
				:entry="entry"
				:proofBoxId="proofBoxId"
			/>
			<LogEntryText
				class="mr-auto"
				:entry="entry"
			/>
			<button
				class="btn btn-sm btn-outline-primary mr-3"
				@click="doSetPrice"
			>${{ entry.price }}</button>
			<LogEntryPaidButton :entry="entry" />
		</div>
		<b-collapse :id="proofBoxId">
			<ProofBox :entry="entry" />
		</b-collapse>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import LogEntryPaidButton from "@/components/LogEntryPaidButton.vue";
import LogEntryText from "@/components/LogEntryText.vue";
import LogEntryTimestamp from "@/components/LogEntryTimestamp.vue";
import ProofBox from "@/components/ProofBox.vue";

export default {
	components: { LogEntryPaidButton, LogEntryText, LogEntryTimestamp, ProofBox },
	props: ["entry"],
	computed: {
		...mapState(["tab"]),
		proofBoxId() {
			return this.entry.code || this.entry.attacks[0].code;
		},
	},
	methods: {
		...mapActions(["setPrice"]),
		doSetPrice() {
			const { entry } = this;
			let price = prompt("New price:");
			if (price === null) return;
			this.setPrice({ entry, price });
		},
	},
};
</script>
