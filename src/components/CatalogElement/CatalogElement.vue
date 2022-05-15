<template>
	<div class="catalogElement">
		<p class="catalogElement__name">{{ product.name }}</p>

		<div class="catalogElement__inner">
			<div class="catalogElement__values">
				<p class="catalogElement__quantity">Hа складе: {{ product.quantity }}</p>
				<p class="catalogElement__price">
					<span :class="isPriceUp">{{ price }}</span> руб.
				</p>
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
import {useCurrencyStore} from "../../../store/CurrencyStore";

export default {
	name: 'CatalogElement',

	props: {
		product: Object
	},

	data() {
		return {
			lastCurrencyRate: 0
		}
	},

	computed: {
		...mapStores(useCartStore, useCurrencyStore),

		price() {
			return toRoubleHelper(this.product.price, this.currencyStore.rubPerUsd);
		},

		inCart() {
			return !!this.cartStore.cart.find(p => p.id === this.product.id);
		},

		isPriceUp() {
			let direction = '';

			if (this.lastCurrencyRate === 0 || this.lastCurrencyRate === this.currencyStore.rubPerUsd) {
				direction = 'same';
			}
			if (this.lastCurrencyRate < this.currencyStore.rubPerUsd) {
				direction = 'up';
			} else if (this.lastCurrencyRate > this.currencyStore.rubPerUsd) {
				direction = 'down';
			}

			this.lastCurrencyRate = this.currencyStore.rubPerUsd;

			return direction;
		}
	},

	mounted() {
		this.lastCurrencyRate = this.currencyStore.rubPerUsd;
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
