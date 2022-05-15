<template>
	<div class="currencyRate">
		Текущий курс: <br />{{ currencyStore.rubPerUsd }} руб. за $1
	</div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useCurrencyStore} from "../../../store/CurrencyStore";

export default {
	name: 'CurrencyRate',

	computed: {
		...mapStores(useCurrencyStore, ['currency']),
	}
}
</script>
