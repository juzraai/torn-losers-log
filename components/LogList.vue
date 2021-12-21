<template>
	<Card>
		<div class="card-header p-0">
			<LogListHeader />
		</div>
		<ul class="list-group list-group-flush">
			<li
				v-if="!items.length"
				class="list-group-item"
			>
				{{ notFoundMessage }}
			</li>
			<li
				v-for="attacks in items"
				v-else
				:key="`${attacks[0].code}/${attacks[0].session}`"
				class="list-group-item p-0"
			>
				<LogListItem
					:attacks="attacks"
					@attacksUpdated="query"
				/>
			</li>
		</ul>
		<div class="border-top card-footer d-flex justify-content-center py-2">
			<b-button
				v-if="limit > 10"
				class="mx-3"
				variant="link"
				@click="limit -= 10"
				v-text="'-10 entry'"
			/>
			<b-button
				v-if="items.length === limit"
				class="mx-3"
				variant="link"
				@click="limit += 10"
				v-text="'+10 entry'"
			/>
		</div>
	</Card>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import DB from '@/services/database';

export default {
	data: () => ({
		items: [],
		limit: 10, // TODO offset?
	}),
	computed: {
		...mapState('log', ['group', 'lastUpdated', 'paid', 'result', 'role']),
		...mapState('settings', ['playerId']),
		...mapState('ui', ['loading']),
		notFoundMessage() {
			const verb = this.result === 'Lost' ? 'lost to' : 'escaped from';
			return this.role === 'attacker'
				? `You haven't ${verb} anyone recently.`
				: `Nobody has ${verb} you recently.`;
		},
		thingsThatTriggerUpdate() {
			return [
				//
				this.group,
				this.limit,
				this.paid,
				this.result,
				this.role,
			].join(';');
		},
	},
	watch: {
		thingsThatTriggerUpdate() {
			this.query();
		},
	},
	mounted() {
		this.query();
	},
	methods: {
		...mapMutations('ui', ['SET_LOADING']),
		async query() {
			// TODO limit & offset setting (NOT in store, just here on page), pass to query methods
			this.SET_LOADING(true);
			this.items = await DB.queryAttacks(
				this.role,
				this.result,
				this.paid,
				this.group,
				this.limit
			);
			this.SET_LOADING(false);
		},
	},
};
</script>
