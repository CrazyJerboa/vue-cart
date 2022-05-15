<template>
	<div class="cartOuter">
		<div class="cartOuter__btn">
			<CartIcon />

			<span
				v-if="isCartNotEmpty"
				class="quantity"
			>{{ productsInCart }}</span>
		</div>

		<div v-if="isCartNotEmpty" class="cart">
			<h2 class="cart__title">Корзина</h2>

			<div class="cart__list">
				<CartElement
					v-for="product of cartStore.cart"
					:key="product.id"
					:product="product"
				/>
			</div>

			<div class="cart__summary">
				<span>Итого: {{ cartSumm }} руб.</span>

				<button class="cart__clearBtn" @click="clearCart">Очистить корзину</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import "./Cart";
</style>

<script>
import {mapActions, mapStores} from "pinia/dist/pinia";
import {useCartStore} from "../../../store/CartStore";
import {toRoubleHelper} from "../../helpers/toRouble.helper";
import CartIcon from "../icons/CartIcon.vue";
import CartElement from "../CartElement/CartElement.vue";
import {useCurrencyStore} from "../../../store/CurrencyStore";

export default {
	name: 'Cart',

	components: {
		CartElement,
		CartIcon
	},

	computed: {
		...mapStores(useCartStore, useCurrencyStore),

		isCartNotEmpty() {
			return this.cartStore?.cart.length > 0;
		},

		productsInCart() {
			let quantity = 0;

			this.cartStore.cart.forEach(product => {
				quantity += product.inCartQuantity;
			});

			return quantity;
		},

		cartSumm() {
			let cartSumm = 0;

			this.cartStore.cart.forEach(product => {
				cartSumm += product.price * product.inCartQuantity;
			});

			return toRoubleHelper(cartSumm, this.currencyStore.rubPerUsd);
		}
	},

	methods: {
		...mapActions(useCartStore, ['clearCart']),

		clearCart() {
			this.cartStore.clearCart();
		}
	},
}
</script>
