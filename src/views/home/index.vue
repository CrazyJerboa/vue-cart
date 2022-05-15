<template>
	<p v-if="!isDataLoaded">Loading...</p>

	<div v-else class="catalogList">
		<CatalogCategory
			v-for="category of products"
			:key="category.id"
			:category="category"
		/>
	</div>
</template>

<style lang="scss">
@import "./home";
</style>

<script>
import {api} from "../../../api";
import CatalogCategory from "../../components/CatalogCategory/CatalogCategory.vue";
import {mapActions, mapStores} from "pinia/dist/pinia";
import {useCurrencyStore} from "../../../store/CurrencyStore";

const MIN_USD_RATE = 20;
const MAX_USD_RATE = 80;

export default {
	name: 'MainPage',

	components: {CatalogCategory},

	data() {
		return {
			productNames: [],
			products: [],

			isNamesLoaded: false,
			isProductsLoaded: false,
			interval: undefined
		}
	},

	computed: {
		...mapStores(useCurrencyStore, ['currency']),

		isDataLoaded() {
			return this.isNamesLoaded && this.isProductsLoaded;
		}
	},

	/**
	 * Getting a list of products and launching an interval in which once every 15 minutes
	 * we again receive goods and change the exchange rate
	 */
	created() {
		this.getNames();
		this.getProducts();

		this.interval = setInterval(() => {
			this.updateUsdRate();
			this.getProducts();
		}, 15000);
	},

	methods: {
		...mapActions(useCurrencyStore, ['updateRubPerUsd']),

		/**
		 * Gets random number from MIN_USD_RATE to MAX_USD_RATE and saves it in store
		 */
		updateUsdRate() {
			const rand = Math.floor(MIN_USD_RATE + Math.random() * (MAX_USD_RATE + 1 - MIN_USD_RATE));
			this.updateRubPerUsd(rand);
		},

		/**
		 * Method for getting a list of product names
		 */
		getNames() {
			api.getNames()
				.then(response => {
					this.productNames = response;
					this.isNamesLoaded = true;
				})
				.catch(_ => this.isNamesLoaded = true);
		},

		/**
		 * Method for getting a list of products
		 */
		getProducts() {
			api.getProducts()
				.then(response => {
					this.parseProductsList(response);
				})
				.catch(_ => this.isProductsLoaded = true);
		},

		/**
		 * Parsing and structuring a raw array of goods
		 * @param list
		 */
		parseProductsList(list) {
			this.products = this.products.map(group => {
				group.products = [];

				return group;
			});

			list.forEach(({C, G, T, P}) => {
				const groupIndex = this.products.findIndex(group => group.id === G);

				const product = {
					id: T,
					name: this.productNames[G]?.B[T]?.N,
					price: C,
					quantity: P,
				}

				if (groupIndex >= 0) {
					this.products[groupIndex].products.push(product);
				} else {
					this.products.push({
						id: G,
						name: this.productNames[G]?.G,
						products: [product]
					});
				}
			});

			this.isProductsLoaded = true;
		}
	},

	beforeUnmount() {
		clearInterval(this.interval);
	}
}
</script>


