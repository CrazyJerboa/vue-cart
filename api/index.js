import axios from "axios";

export const api = {
	/**
	 * Get list of product names from names.json file
	 * @returns {Promise<AxiosResponse<any> | void>}
	 */
	getNames: () => {
		return axios.get('names.json')
			.then(response => response.data)
			.catch(error => console.log('Ошибка получения списка имен товаров. ', error));
	},

	/**
	 * Get list of products from data.json file
	 * @returns {Promise<AxiosResponse<any> | void>}
	 */
	getProducts: () => {
		return axios.get('data.json')
			.then(response => response.data.Value.Goods)
			.catch(error => console.log('Ошибка получения списка продуктов. ', error));
	}
}
