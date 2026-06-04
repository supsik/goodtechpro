<template>
	<div class="footer container">
		<nuxt-link class="footer__logo" to="/">GoodTech</nuxt-link>
		<div class="footer__content">
			<div class="footer__description">
				<p>
					GoodTech - Nulla consectetur esse fugiat deserunt anim adipiscing
					pariatur veniam laborum ut fugiat. Est deserunt cillum id consectetur
					dolor minim velit.
				</p>
				<a href="#request-form" class="order__btn">Оставить заявку</a>
			</div>
			<nav class="footer__list">
				<h3>Навигация</h3>
				<ul>
					<li v-for="item in layoutNavigation">
						<nuxt-link :to="item.link">{{ item.name }}</nuxt-link>
					</li>
				</ul>
			</nav>
			<nav class="footer__list">
				<h3>Контакты</h3>
				<ul>
					<li><a href="tel:+79999999999">+7 (999) 999-99-99</a></li>
					<li><a href="tel:+79999999999">+7 (999) 999-99-99</a></li>
					<li><a href="mailto:info@goodtech.ru">info@goodtech.ru</a></li>
				</ul>
			</nav>
			<div class="footer__list soc-section">
				<h3>Социальные сети</h3>
				<ul>
					<li>
						<a href="#" target="_blank"><icons-vkontakte /></a>
					</li>
					<li>
						<a href="#" target="_blank"><icons-telegram /></a>
					</li>
					<li>
						<a href="#" target="_blank"><icons-dzen /></a>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer__bottom">
			<span>© 2026 ООО «GoodTech»</span>
			<div class="footer__list soc-section">
				<ul>
					<li>
						<a href="#" target="_blank"><icons-vkontakte /></a>
					</li>
					<li>
						<a href="#" target="_blank"><icons-telegram /></a>
					</li>
					<li>
						<a href="#" target="_blank"><icons-dzen /></a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
interface Navigation {
	name: String;
	link: string;
};

const props = defineProps({
	layoutNavigation: Array<Navigation>,
});
</script>
<style lang="scss">
.footer {
	background-color: #0c1030;
	padding-top: 52px;
	margin-top: 52px;

	.order__btn {
		margin-top: 52px;
		max-width: 240px;
	}

	@include mq($lg) { padding-block: 32px 24px }
}
.footer__content {
	margin-top: 32px;
	display: flex;
	gap: 80px;

	h3 {
		font-size: 24px;
		font-weight: 500;
	}
}

.footer__description { max-width: 520px }

.footer__list {
	&:first-of-type { margin-left: auto }

	&.soc-section {
		ul {
			flex-direction: row;
			gap: 24px;
		}
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 18px;
		margin-top: 20px;
	}

	a {
		display: block;
		color: #ffffff76;
		position: relative;
		transition: 0.2s;
		font-size: 20px;
		font-weight: 500;

		&:hover { color: #fff }
	}
}

.footer__bottom {
	display: flex;
	align-items: center;
	margin-top: 100px;
	padding-block: 24px;
	border-top: 1px solid rgba($color: #FFF, $alpha: .2);
	font-weight: 500;

	& * { color: rgba($color: #FFF, $alpha: .2) }
	
	.soc-section {
		ul { margin-top: 0 }

		li {
			width: 24px;
			height: 24px;

			svg {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
