<template>
	<div>
		<ul class="list-group mb-3">
			<li
				class="list-group-item"
				:key="a.code"
				v-for="a in lossesOnPage"
			>
				You lost to
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
			</li>
		</ul>
		<div class="d-flex justify-content-between">
			<ul class="pagination pagination-sm">
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
			<ul class="pagination pagination-sm">
				<li
					class="page-item"
					:class="{ disabled: page <= 0 }"
					@click="page = 0"
				>
					<a
						class="page-link"
						href="#"
					>First</a>
				</li>
				<li
					class="page-item"
					:class="{ disabled: page <= 0 }"
					@click="page--"
				>
					<a
						class="page-link"
						href="#"
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
						href="#"
					>Next</a>
				</li>
				<li
					class="page-item"
					:class="{ disabled: page >= pageCount - 1 }"
					@click="page = pageCount - 1"
				>
					<a
						class="page-link"
						href="#"
					>Last</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import Player from "@/components/Player.vue";

export default {
	components: { Player },
	data() {
		return {
			limit: 10,
			limitOptions: [10, 20, 25, 50],
			page: 0,
		};
	},
	computed: {
		...mapState(["losses"]),
		offset() {
			return this.limit * this.page;
		},
		pageCount() {
			return Math.ceil(this.losses.length / this.limit);
		},
		lossesOnPage() {
			return this.losses.slice(this.offset, this.offset + this.limit);
		},
	},
};
</script>
