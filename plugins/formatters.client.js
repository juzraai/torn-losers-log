import dayjs from 'dayjs';

export default (_, inject) => {
	inject('price', price => {
		const suffixes = ['', 'k', 'M', 'B'];
		let i = 0;
		while (price > 1000 && i < suffixes.length) {
			price /= 1000;
			i++;
		}
		return Math.round(price * 100) / 100 + suffixes[i];
	});
	inject('timestamp', tsInSeconds => {
		return dayjs(tsInSeconds * 1000).utc().format('ddd HH:mm:ss - DD/MM/YY');
	});
};
