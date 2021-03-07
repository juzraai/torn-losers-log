<template>
	<div
		class="d-flex flex-column"
		style="min-height: 100%"
	>
		<Navbar />
		<div class="d-flex flex-column flex-grow-1">
			<div class="container my-5">
				<Login v-if="!apiKey" />
				<Pills v-else />
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import Login from "@/components/Login.vue";
import Navbar from "@/components/Navbar.vue";
import Pills from "@/components/Pills.vue";

export default {
	components: { Login, Navbar, Pills },
	computed: {
		...mapState(["apiKey"]),
	},
};
</script>
