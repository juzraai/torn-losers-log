import dayjs from 'dayjs';

export default (_, inject) => {
	inject('timestamp', tsInSeconds => {
		return dayjs(tsInSeconds * 1000).utc().format('ddd HH:mm:ss - DD/MM/YY');
	});
};

/*
export function formatPrice(price) {
	const suffixes = ["", "k", "M", "B"];
	let i = 0;
	while (price > 1000 && i < suffixes.length) {
		price /= 1000;
		i++;
	}
	// TODO add thousand grouping
	return price + suffixes[i];
}
*/
