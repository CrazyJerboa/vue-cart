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
	},

	methods: {
		getNames() {
			api.parseNames()
				.then(response => {
					console.log(response)
				})
		}
	}
}
</script>


