<template>
	<div class="header container">
		<div class="header-wr">
			<nuxt-link class="header__logo" to="/">GoodTech</nuxt-link>
			<nav class="header__navigation">
				<ul>
					<li v-for="item in layoutNavigation">
						<nuxt-link :to="item.link">{{ item.name }}</nuxt-link>
					</li>
				</ul>
			</nav>
			<button class="header__btn">Оставить заявку</button>
		</div>
	</div>
</template>
<script setup lang="ts">
interface Navigation {
	name: String,
	link: string,
};

const props = defineProps({
	layoutNavigation: Array<Navigation>,
});
</script>
<style lang="scss">
.header {
	width: 100%;
	position: fixed;
	margin-top: 42px;
}

.header-wr {
	padding: 20px 32px;
	border-radius: 32px;
	display: flex;
	align-items: center;
	background-image: linear-gradient(#ffffff00, #ffffff09);
	box-shadow:
		inset 0 -2px 4px 0 #ffffff16,
		inset 0 2px 4px 0 #ffffff24;
	backdrop-filter: blur(4px);
}

.header__logo {
	margin-left: 42px;
}

.header__navigation {
	margin-left: 200px;

	ul {
		display: flex;
		align-items: center;
		gap: 62px;
	}

	li {
		font-size: 20px;
		font-weight: 500;
	}

	a {
		position: relative;

		&::before {
			transform-origin: 100% 50%;
			transform: scale3d(0, 1, 1);
			transition: transform 0.4s, -webkit-transform 0.4s;
			content: "";
			height: 2px;
			width: 100%;
			background-color: #FFF;
			position: absolute;
			left: 0;
			bottom: -2px;
			pointer-events: none;
		}

		&:hover::before {
  		transform-origin: 0% 50%;
  		transform: scale3d(1, 1, 1);
		}
	}
}
</style>
