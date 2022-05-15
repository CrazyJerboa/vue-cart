import {defineStore} from "pinia/dist/pinia";

export const useCartStore = defineStore('cart', {
	state: () => ({
		cart: []
	}),

	actions: {
		addProductToCart(product) {
			this.cart.push(product);
		},

		deleteProductFromCart(productId) {
			this.cart = this.cart.filter(product => product.id !== productId);
		},

		updateProductInCart(productId, newQuantity) {
			this.cart = this.cart.map(product => {
				if (product.id === productId) {
					product.inCartQuantity = newQuantity;
				}

				return product;
			});
		},

		clearCart() {
			this.cart = [];
		}
	},
})
