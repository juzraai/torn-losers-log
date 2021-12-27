import Vue from 'vue';

Vue.mixin({
	methods: {
		toast(message, toastClass) {
			this.$bvToast.toast(message, {
				autoHideDelay: 2500,
				noCloseButton: true,
				toaster: 'b-toaster-bottom-center',
				toastClass,
			});
		},
		errorToast(message) {
			this.toast(message, 'bg-danger text-white');
		},
		successToast(message) {
			this.toast(message, 'bg-success text-white');
		}
	}
});
