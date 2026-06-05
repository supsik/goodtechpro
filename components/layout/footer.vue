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
		<a href="#request-form" class="order__btn">Оставить заявку</a>
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

	& > .order__btn {
		display: none;
		margin-top: 100px;
	}

	@include mq($xl) {
		& > .order__btn { display: grid }
	}

	@include mq($lg) {
		padding-top: 32px;
		
		& > .order__btn {
			max-width: unset;
			height: 58px;
			border-radius: 26px;
			grid-column: 1 / 3;
			margin-top: 72px;
			font-size: 22px;
		}
	}
}

.footer__content {
	margin-top: 32px;
	display: flex;
	gap: 4%;

	.soc-section { display: none }

	h3 {
		font-size: clamp(1.25rem, 0.9643rem + 0.5952vw, 1.5rem);
		font-weight: 500;
	}

	@include mq($xl) {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 52px 40px;

		.order__btn { display: none }

		.footer__list {
			grid-row: 2;

			&:first-of-type { margin-left: 0 }
		}

		.soc-section { display: block }
	}

	@include mq($md) {
		grid-template-columns: repeat(2, 1fr);
	
		.soc-section { display: none }
	}

	@include mq($sm) {
		grid-template-columns: 1fr;
	
		.footer__list { grid-row: unset }
	}
}

.footer__description {
	max-width: 520px;

	@include mq($xl) {
		max-width: unset;
		grid-column: 1 / 3;
	}

	@include mq($sm) {
		grid-column: 1;
		font-size: 14px;
	}
}

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
		font-size: clamp(0.875rem, calc(-0.25rem + 1.25vw), 1.25rem);
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

	@include mq($xl) { margin-top: 32px }

	@include mq($sm) {
		font-size: 14px;

		.soc-section ul { gap: 16px }
	}
}
</style>
