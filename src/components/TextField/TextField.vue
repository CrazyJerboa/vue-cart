<template>
	<input
		ref="field"
		:type="type"
		:value='modelValue'
		:min="numberMin"
		:max="numberMax"
		@input='onInput($event)'
	/>
</template>

<script>
export default {
	name: 'TextField',

	props: {
		modelValue: [String, Number],

		type: {
			type: String,
			default: 'text'
		},

		numberMin: Number,
		numberMax: Number
	},

	methods: {
		onInput(event) {
			if (this.type === 'number') {
				const value = +event.target.value;

				if (value < this.numberMin) {
					this.$refs.field.value = this.numberMin;
				}
				if (value > this.numberMax) {
					this.$refs.field.value = this.numberMax;
				}
			}

			this.$emit("update:modelValue", event.target.value);
		}
	}
}
</script>
