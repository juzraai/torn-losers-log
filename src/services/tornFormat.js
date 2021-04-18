import moment from "moment";

export function formatPrice(price) {
	const suffixes = ["", "k", "M", "B"];
	let i = 0;
	while (price > 1000 && i < suffixes.length) {
		price /= 1000;
		i++;
	}
	return price + suffixes[i];
}

export function formatTimestamp(t) {
	return moment(t * 1000)
		.utcOffset(0)
		.format("ddd HH:mm:ss - DD/MM/YY");
}
