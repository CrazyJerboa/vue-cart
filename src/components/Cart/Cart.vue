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
				<div
					v-for="product of cartStore.cart"
					class="cartElement"
					:key="product.id"
				>
					<p class="cartElement__name">{{ product.name }} <br/> <span>{{ getPriceInRoubles(product.price * product.inCartQuantity) }} руб.</span></p>

					<div class="cartElement__quantity">
						<button>&minus;	</button>
						<span>{{ product.inCartQuantity }}</span>
						<button>&plus;</button>
					</div>

					<button class="cartElement__delete">&times;</button>
				</div>
			</div>

			<div class="cart__summary">
				Итого: {{ cartSumm }} руб.
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import "./Cart";
</style>

<script>
import {mapActions, mapStores} from "pinia/dist/pinia";
import {useCartStore} from "../../../store/useCartStore";
import CartIcon from "../icons/CartIcon.vue";
import {toRoubleHelper} from "../../helpers/toRouble.helper";

export default {
	name: 'Cart',

	components: {
		CartIcon
	},

	computed: {
		...mapStores(useCartStore, ['cart']),

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

			return toRoubleHelper(cartSumm);
		}
	},

	methods: {
		...mapActions(useCartStore, ['deleteProductFromCart']),

		getPriceInRoubles(price) {
			return toRoubleHelper(price);
		}
	},
}
</script>
