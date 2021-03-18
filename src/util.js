import moment from "moment";

export function formatTimestamp(t) {
	return moment(t * 1000)
		.utcOffset(0)
		.format("ddd HH:mm:ss DD/MM/YY");
} // TODO maybe this can be part of tornApi.js?
