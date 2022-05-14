<template>
	<div class="cartElement">
		<p class="cartElement__name">{{ product.name }} <br/> <span>{{ getPriceInRoubles(product.price * product.inCartQuantity) }} руб.</span></p>

		<div class="cartElement__quantity">
			<button>&minus;	</button>
			<span>{{ product.inCartQuantity }}</span>
			<button>&plus;</button>
		</div>

		<button class="cartElement__delete">&times;</button>
	</div>
</template>

<style lang="scss">
@import "./CartElement";
</style>

<script>
import {toRoubleHelper} from "../../helpers/toRouble.helper";
import {mapActions} from "pinia/dist/pinia";
import {useCartStore} from "../../../store/useCartStore";

export default {
	name: 'CartElement',

	props: {
		product: Object
	},

	methods: {
		...mapActions(useCartStore, ['deleteProductFromCart']),

		getPriceInRoubles(price) {
			return toRoubleHelper(price);
		}
	}
}
</script>
