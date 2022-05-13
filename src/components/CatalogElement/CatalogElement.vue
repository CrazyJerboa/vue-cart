<template>
	<div class="catalogElement">
		<p class="catalogElement__name">{{ product.name }}</p>

		<div class="catalogElement__inner">
			<div class="catalogElement__values">
				<p class="catalogElement__quantity">Hа складе: {{ product.quantity }}</p>
				<p class="catalogElement__price">{{ price }} руб.</p>
			</div>

			<button>В корзину</button>
		</div>
	</div>
</template>

<style lang="scss">
@import "./CatalogElement";
</style>

<script>
import {toRoubleHelper} from "../../helpers/toRouble.helper";

export default {
	name: 'CatalogElement',

	props: {
		product: Object
	},

	computed: {
		price() {
			return toRoubleHelper(this.product.price);
		}
	}
}
</script>
