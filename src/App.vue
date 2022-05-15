<template>
	<header class="header">
		<div class="container">
			<CurrencyRate />
			<Cart />
		</div>
	</header>

	<main class="wrapper">
		<div class="container">
			<MainPage />
		</div>
	</main>
</template>

<style lang="scss">
@import './assets/base.scss';
</style>

<script>
import Cart from "./components/Cart/Cart.vue";
import MainPage from "./views/home/index.vue";
import CurrencyRate from "./components/CurrencyRate/CurrencyRate.vue";

export default {
	components: {
		CurrencyRate,
		MainPage,
		Cart
	}
}
</script>
