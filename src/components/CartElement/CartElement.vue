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

			<span>
				<TextField
					v-model="currentQuantity"
					:type="'number'"
					:numberMin="1"
					:numberMax="this.product.quantity"
					@update:modelValue="onFieldChange"
				/>
			</span>

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
import {mapActions, mapStores} from "pinia/dist/pinia";
import {useCartStore} from "../../../store/CartStore";
import {useCurrencyStore} from "../../../store/CurrencyStore";
import TextField from "../TextField/TextField.vue";

export default {
	name: 'CartElement',
	components: {TextField},
	data() {
		return {
			currentQuantity: 0,
			limitedQuantity: 3 // if the quantity of goods in the cart is less than this number, the message "Quantity is limited" is displayed
		}
	},

	props: {
		product: Object
	},

	computed: {
		...mapStores(useCurrencyStore),
	},

	mounted() {
		this.currentQuantity = this.product.inCartQuantity;
	},

	methods: {
		...mapActions(useCartStore, ['deleteProductFromCart', 'updateProductInCart']),

		getPriceInRoubles(price) {
			return toRoubleHelper(price, this.currencyStore.rubPerUsd);
		},

		/**
		 * Disabling/Enabling "+" or "-" button if current quantity of product is more or less
		 * than the minimum and maximum value of the total quantity of goods in stock
		 * @param direction - 'up' or 'down'
		 * @returns {boolean}
		 */
		checkBtnIsDisabled(direction) {
			return direction === 'up' ? this.currentQuantity === this.product.quantity : this.currentQuantity === 1;
		},

		/**
		 * Updating the total quantity of the current item in the cart.
		 * Depending on pressing the "+" (up) or "-" (down) button.
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

		/**
		 * Updating the total quantity of the current item in the cart by input from keyboard
		 * @param event
		 */
		onFieldChange(event) {
			this.updateProductInCart(this.product.id, +event);
		},

		deleteProduct() {
			this.deleteProductFromCart(this.product.id);
		}
	}
}
</script>
