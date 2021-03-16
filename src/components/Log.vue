<template>
	<div>
		<div
			class="my-5 text-center"
			v-if="!entries.length"
		>
			No results.
		</div>
		<div v-else>
			<div class="border-bottom list-group list-group-flush">
				<LogEntry
					:entry="e"
					:key="entryKey(e)"
					v-for="e in entriesOnPage"
				/>
			</div>
			<div class="bg-light d-flex flex-wrap justify-content-center pt-3">
				<ul class="pagination">
					<li
						class="page-item"
						:class="{ disabled: page <= 0 }"
						@click="page = 0"
					>
						<a
							class="page-link"
							href="javascript:void(0)"
						>First</a>
					</li>
					<li
						class="page-item"
						:class="{ disabled: page <= 0 }"
						@click="page--"
					>
						<a
							class="page-link"
							href="javascript:void(0)"
						>Previous</a>
					</li>
					<li class="disabled page-item">
						<span class="page-link">{{ page + 1 }} / {{ pageCount }}</span>
					</li>
					<li
						class="page-item"
						:class="{ disabled: page >= pageCount - 1 }"
						@click="page++"
					>
						<a
							class="page-link"
							href="javascript:void(0)"
						>Next</a>
					</li>
					<li
						class="page-item"
						:class="{ disabled: page >= pageCount - 1 }"
						@click="page = pageCount - 1"
					>
						<a
							class="page-link"
							href="javascript:void(0)"
						>Last</a>
					</li>
				</ul>
				<ul class="d-none d-md-flex pagination ml-5">
					<li
						class="page-item"
						:class="{ active: o == limit }"
						:key="o"
						v-for="o in limitOptions"
						@click="limit = o; page = 0"
					>
						<a
							class="page-link"
							href="#"
						>{{ o }}</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import LogEntry from "@/components/LogEntry.vue";

export default {
	components: { LogEntry },
	props: ["entries"],
	data() {
		return {
			limit: 10,
			limitOptions: [10, 20, 25, 50],
			page: 0,
		};
	},
	computed: {
		...mapState(["tab"]),
		offset() {
			return this.limit * this.page;
		},
		pageCount() {
			return Math.ceil(this.entries.length / this.limit);
		},
		entriesOnPage() {
			return this.entries.slice(this.offset, this.offset + this.limit);
		},
	},
	methods: {
		entryKey(a) {
			return "t" + this.tab + "a" + (a.code || a.attacks[0].code);
		},
	},
	watch: {
		tab() {
			this.page = 0;
		},
	},
};
</script>
