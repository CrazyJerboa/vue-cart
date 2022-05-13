import axios from "axios";

export const api = {
	getNames: () => {
		return axios.get('names.json')
			.then(response => response.data)
			.catch(error => console.log('Ошибка получения списка имен товаров. ', error));
	},

	getProducts: () => {
		return axios.get('data.json')
			.then(response => response.data.Value.Goods)
			.catch(error => console.log('Ошибка получения списка продуктов. ', error));
	}
}
