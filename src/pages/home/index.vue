<template>
	<p v-if="!isDataLoaded">Loading...</p>

	<div v-else class="products">
		<CatalogCategory
			v-for="category of products"
			:key="category.id"
			:category="category"
		/>
	</div>
</template>

<script>
import {api} from "../../../api";
import CatalogCategory from "../../components/CatalogCategory/CatalogCategory.vue";

export default {
	name: 'MainPage',

	components: {CatalogCategory},

	data() {
		return {
			productNames: [],
			products: [],

			isNamesLoaded: false,
			isProductsLoaded: false
		}
	},

	computed: {
		isDataLoaded() {
			return this.isNamesLoaded && this.isProductsLoaded;
		}
	},

	mounted() {
		this.getNames();
		this.getProducts();
	},

	methods: {
		getNames() {
			api.getNames()
				.then(response => {
					this.productNames = response;
					this.isNamesLoaded = true;
				})
				.catch(_ => this.isNamesLoaded = true);
		},

		getProducts() {
			api.getProducts()
				.then(response => this.parseProductsList(response))
				.catch(_ => this.isProductsLoaded = true);
		},

		parseProductsList(list) {
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
	}
}
</script>


