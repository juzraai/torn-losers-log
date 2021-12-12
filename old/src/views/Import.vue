<template>
	<div class="row">
		<div class="col-sm-11 col-md-8 col-lg-6 col-xl-5 mx-auto">
			<Widget cardTitle="Import data">
				<p>Here you can import a previously exported TLL JSON file.</p>
				<div
					class="alert alert-danger my-4"
					v-if="apiKey"
				>This will overwrite <strong>EVERYTHING</strong> in this browser's TLL instance (stored losses, paid marks, resolved names), <strong>except</strong> your API key. If you wish to overwrite your API key too, please use <em>Clear data</em> option first from the top right menu.</div>
				<div class="my-4">
					<b-form-file
						drop-placeholder="Drop file here..."
						placeholder="Choose a file or drop it here..."
						size="lg"
						:state="Boolean(file)"
						v-model="file"
					></b-form-file>
				</div>

				<div
					class="alert alert-info my-4"
					v-if="uploadedState"
				>
					<strong>{{ uploadedState.losses.length }}</strong>
					losses, updated
					<timeago
						:auto-update="60"
						:datetime="uploadedState.lastUpdate"
					/>
				</div>
				<div class="d-flex justify-content-between mt-4">
					<button
						class="btn btn-outline-secondary"
						@click="file=null"
					>
						Clear
					</button>
					<button
						class="btn btn-primary"
						:disabled="!uploadedState"
						@click="doImport"
					>
						Import
					</button>
				</div>
			</Widget>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Widget from "@/components/Widget.vue";

function readUploadedFile(file) {
	const reader = new FileReader();
	return new Promise((resolve, reject) => {
		reader.onload = (event) => resolve(event.target.result);
		reader.onerror = (error) => reject(error);
		reader.readAsText(file);
	});
}

export default {
	components: { Widget },
	metaInfo: {
		title: "Import data",
	},
	data() {
		return {
			file: null,
			uploadedState: null,
		};
	},
	computed: {
		...mapState(["apiKey"]),
	},
	methods: {
		...mapMutations(["init"]),
		doImport() {
			this.init(this.uploadedState);
			this.file = null;
			this.$router.push("/");
		},
	},
	watch: {
		async file(f) {
			try {
				const json = await readUploadedFile(f);
				this.uploadedState = JSON.parse(json);
			} catch {
				this.uploadedState = null;
			}
		},
	},
};
</script>
