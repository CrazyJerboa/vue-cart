export const toRoubleHelper = (price, currentRate) => {
	const priceInRoubles = Math.round((price * currentRate * 100) / 100);

	return priceInRoubles.toLocaleString('RUB');
}
