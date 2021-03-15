<template>
	<div>
		<div
			class="my-5 text-center"
			v-if="!list.length"
		>
			No results.
		</div>
		<div v-else>
			<div class="border-bottom list-group list-group-flush">
				<ListItem
					:a="a"
					:key="JSON.stringify(a)"
					v-for="a in listItemsOnPage"
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
import ListItem from "@/components/ListItem.vue";

export default {
	components: { ListItem },
	props: ["list"],
	data() {
		return {
			limit: 10,
			limitOptions: [10, 20, 25, 50],
			page: 0,
		};
	},
	computed: {
		offset() {
			return this.limit * this.page;
		},
		pageCount() {
			return Math.ceil(this.list.length / this.limit);
		},
		listItemsOnPage() {
			return this.list.slice(this.offset, this.offset + this.limit);
		},
	},
	watch: {
		list() {
			this.page = 0;
		},
	},
};
</script>
