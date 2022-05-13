<template>
	<header class="header">
		<div class="container">
			<MainMenu/>
		</div>
	</header>

	<main class="wrapper">
		<div class="container">
			<RouterView/>
		</div>
	</main>
</template>

<style lang="scss">
@import './assets/base.scss';
</style>

<script>
import {RouterView} from 'vue-router';
import MainMenu from "./components/MainMenu/MainMenu.vue";

export default {
	components: {
		RouterView,
		MainMenu
	}
}
</script>
