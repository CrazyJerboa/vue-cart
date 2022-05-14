import {defineStore} from "pinia/dist/pinia";

export const useCartStore = defineStore('cart', {
	state: () => ({
		cart: []
	}),

	actions: {
		addProductToCart(product) {
			console.log(product)
			this.cart.push(product);
		},

		deleteProductFromCart(productId) {
			this.cart = this.cart.filter(product => product.id !== productId);
		}
	},
})
