<template>
	<div>
		<div v-html="readme"></div>
	</div>
</template>

<script>
//import HelloWorld from '@/components/HelloWorld.vue'

import readme from '/README.md'

export default {
	name: "Home",
	components: {
		//HelloWorld
	},
	data() {
		return {
			readme
		}
	}
};
</script>
