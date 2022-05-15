/**
 * The method receives the price of the product and the current exchange rate,
 * converts the price from dollars to rubles
 * @param price
 * @param currentRate
 * @returns {string}
 */
export const toRoubleHelper = (price, currentRate) => {
	const priceInRoubles = Math.round((price * currentRate * 100) / 100);

	return priceInRoubles.toLocaleString('RUB');
}
