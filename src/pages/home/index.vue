<template>
	Main Page {{ test }}
</template>

<script>
import {api} from "../../../api";

export default {
	name: 'MainPage',

	data() {
		return {
			test: 1
		}
	},

	mounted() {
		this.getNames();
		this.getProducts();
	},

	methods: {
		getNames() {
			api.getNames()
				.then(response => {
					console.log(response)
				})
		},

		getProducts() {
			api.getProducts()
				.then(response => {
					console.log(response)
				})
		}
	}
}
</script>


