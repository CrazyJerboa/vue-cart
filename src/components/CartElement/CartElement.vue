<template>
	<div class="cartElement">
		<p class="cartElement__name">
			{{ product.name }} <br/>
			<span>{{ getPriceInRoubles(product.price) }} руб. / шт.</span> <br/>
			<span
				v-if="product.quantity <= limitedQuantity"
				class="cartElement__nameLimited"
			>Количество ограничено</span>
		</p>

		<div class="cartElement__quantity">
			<button
				:disabled="checkBtnIsDisabled('down')"
				@click="updateProduct('down')"
			>&minus;</button>

			<span>{{ product.inCartQuantity }}</span>

			<button
				:disabled="checkBtnIsDisabled('up')"
				@click="updateProduct('up')"
			>&plus;</button>
		</div>

		<button
			class="cartElement__delete"
			@click="deleteProduct"
		>&times;</button>
	</div>
</template>

<style lang="scss">
@import "./CartElement";
</style>

<script>
import {toRoubleHelper} from "../../helpers/toRouble.helper";
import {mapActions} from "pinia/dist/pinia";
import {useCartStore} from "../../../store/CartStore";

export default {
	name: 'CartElement',

	data() {
		return {
			currentQuantity: 0,
			limitedQuantity: 3
		}
	},

	props: {
		product: Object
	},

	mounted() {
		this.currentQuantity = this.product.inCartQuantity;
	},

	methods: {
		...mapActions(useCartStore, ['deleteProductFromCart', 'updateProductInCart']),

		getPriceInRoubles(price) {
			return toRoubleHelper(price);
		},

		/**
		 *
		 * @param direction - 'up' or 'down'
		 * @returns {boolean}
		 */
		checkBtnIsDisabled(direction) {
			return direction === 'up' ? this.currentQuantity === this.product.quantity : this.currentQuantity === 1;
		},

		/**
		 *
		 * @param direction - 'up' or 'down'
		 */
		updateProduct(direction) {
			const minQuantity = 1;
			const maxQuantity = this.product.quantity;
			const currentQuantity = this.product.inCartQuantity

			this.currentQuantity = direction === 'up' ? currentQuantity + 1 : currentQuantity - 1;

			if (this.currentQuantity < minQuantity) {
				this.currentQuantity = minQuantity;
			}
			if (this.currentQuantity > maxQuantity) {
				this.currentQuantity = maxQuantity;
			}

			this.updateProductInCart(this.product.id, this.currentQuantity);
		},

		deleteProduct() {
			this.deleteProductFromCart(this.product.id);
		}
	}
}
</script>
