<template>
	<div class="page-wr">
		<ui-header :layoutNavigation/>
		<slot />
		<ui-footer :layoutNavigation/>
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
		link: "/confidential",
	}
])
</script>
<style lang='scss'>
.header__logo,
.footer__logo {
	font-size: 42px;
	font-weight: 500;
}

.header__btn,
.footer__btn {
	width: 240px;
	height: 56px;
	margin-left: auto;
	background-color: #fff;
	border-radius: 16px;
	color: #0048ff;
	font-size: 22px;
	font-weight: 500;
}
</style>