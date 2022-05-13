<template>
	<div class="catalogElement">
		<p class="catalogElement__name">{{ product.name }} ({{ product.quantity }}) / {{ price }} руб.</p>
	</div>
</template>

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
