<template>
	<div class="footer container">
		<nuxt-link class="footer__logo" to="/">GoodTech</nuxt-link>
		<nav class="footer__navigation">
			<ul>
				<li v-for="item in layoutNavigation">
					<nuxt-link :to="item.link">{{ item.name }}</nuxt-link>
				</li>
			</ul>
		</nav>
		<button class="order__btn">Оставить заявку</button>
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
<style lang='scss'>
.footer {
	background-color: #0c1030;
	padding-block: 52px 32px;
	margin-top: auto;

	.order__btn { margin-top: 42px }

	@include mq($lg) { padding-block: 32px 24px }
}

.footer__navigation {
	margin-top: 24px;

	ul {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	a {
		color: #ffffff76;
		position: relative;
		transition: .2s;

		&:hover { color: #FFF }
	}
}
</style>