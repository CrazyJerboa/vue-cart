export const toRoubleHelper = (price) => {
	const COURSE = 80;
	const priceInRoubles = Math.round((price * COURSE * 100) / 100);

	return priceInRoubles.toLocaleString('RUB');
}
