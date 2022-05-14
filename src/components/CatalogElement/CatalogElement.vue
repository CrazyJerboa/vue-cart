<template>
	<div class="catalogElement">
		<p class="catalogElement__name">{{ product.name }}</p>

		<div class="catalogElement__inner">
			<div class="catalogElement__values">
				<p class="catalogElement__quantity">Hа складе: {{ product.quantity }}</p>
				<p class="catalogElement__price">{{ price }} руб.</p>
			</div>

			<button
				@click="addToCart(product)"
				:disabled="inCart"
			>{{ inCart ? 'В корзине' : 'В корзину' }}</button>
		</div>
	</div>
</template>

<style lang="scss">
@import "./CatalogElement";
</style>

<script>
import {toRoubleHelper} from "../../helpers/toRouble.helper";
import {mapActions, mapStores} from "pinia/dist/pinia";
import {useCartStore} from "../../../store/CartStore";

export default {
	name: 'CatalogElement',

	props: {
		product: Object
	},

	computed: {
		...mapStores(useCartStore, ['cart']),

		price() {
			return toRoubleHelper(this.product.price);
		},

		inCart() {
			return !!this.cartStore.cart.find(p => p.id === this.product.id);
		}
	},

	methods: {
		...mapActions(useCartStore, ['addProductToCart']),

		addToCart(product) {
			this.addProductToCart({
				...product,
				inCartQuantity: 1
			});
		}
	}
}
</script>
