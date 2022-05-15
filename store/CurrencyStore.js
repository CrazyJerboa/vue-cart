import {defineStore} from "pinia/dist/pinia";

export const useCurrencyStore = defineStore('currency', {
	state: () => ({
		rubPerUsd: 60
	}),

	actions: {
		updateRubPerUsd(value) {
			console.log(value)
			this.rubPerUsd = value;
		}
	}
})
