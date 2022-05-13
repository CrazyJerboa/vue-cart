<template>
	<nav class="mainMenu">
		<ul>
			<li>
				<RouterLink to="/">Home</RouterLink>
			</li>
			<li>
				<RouterLink to="/cart">Cart</RouterLink>
			</li>
		</ul>
	</nav>
</template>

<style lang="scss">
@import "./MainMenu";
</style>

<script>
import {RouterLink} from 'vue-router';

export default {
	name: 'MainMenu',

	components: {
		RouterLink
	}
}
</script>
