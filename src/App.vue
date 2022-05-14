<template>
	<header class="header">
		<div class="container">
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
import MainPage from "./pages/home/index.vue";

export default {
	components: {
		MainPage,
		Cart
	}
}
</script>
