<template>
	<div class="page-wr">
		<layout-header :layoutNavigation/>
		<slot />
		<layout-footer :layoutNavigation/>
	</div>
</template>
<script setup lang="ts">
const layoutNavigation = ref([
	{
		name: "О нас",
		link: "/about-us",
	},
	{
		name: "Наши проекты",
		link: "/portfolio",
	},
	{
		name: "Политика конфиденциальности",
		link: "/policy",
	}
])
</script>
<style lang='scss'>
.header__logo,
.footer__logo {
	font-size: 42px;
	font-weight: 500;

	@include mq($xl) { font-size: 32px }
}

.order__btn {
	display: grid;
	place-items: center;
	background-color: #fff;
	border-radius: 16px;
	color: #0048ff;
	font-size: clamp(1.13rem, calc(0.375rem + 0.833vw), 1.38rem);
	padding: 14px 32px;
	font-weight: 500;
	transition: .25s ease;

	&:hover {
		transform: scale(1.1);
		border-radius: 30px;
		box-shadow: 0 4px 2px 0 #0000003a;
	}

	@include mq($xl) {
		font-size: clamp(0.88rem, calc(0.567rem + 0.481vw), 1.00rem);
		padding: 10px 14px;
	}
}
</style>