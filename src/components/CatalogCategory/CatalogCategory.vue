<template>
	<div class="catalogCategory">
		<h2>{{ category.name }}</h2>

		<CatalogElement
			v-for="product of category.products"
			:key="product.id"
			:product="product"
		/>
	</div>
</template>

<script>
import CatalogElement from "../CatalogElement/CatalogElement.vue";

export default {
	name: 'CatalogCategory',

	components: {CatalogElement},

	props: {
		category: Object
	}
}
</script>
