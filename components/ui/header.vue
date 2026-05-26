<template>
	<div class="header container">
		<div class="header-wr" :class="{ 'header-wr--active': isBurgerActive }">
			<div class="header__top">
				<nuxt-link class="header__logo" to="/">GoodTech</nuxt-link>
				<nav class="header__navigation header__navigation--desktop">
					<ul>
						<li v-for="item in layoutNavigation">
							<nuxt-link :to="item.link">{{ item.name }}</nuxt-link>
						</li>
					</ul>
				</nav>
				<button class="order__btn order__btn--desktop">
					Оставить заявку
				</button>
				<button
					class="header__burger-btn"
					:class="{ 'header__burger-btn--active': isBurgerActive }"
					@click="isBurgerActive = !isBurgerActive"
				>
					<div />
					<div />
					<div />
				</button>
			</div>
			<div
				class="header__bottom"
				:class="{ 'header__bottom--active': isBurgerActive }"
			>
				<nav class="header__navigation">
					<ul>
						<li v-for="item in layoutNavigation">
							<nuxt-link :to="item.link">{{ item.name }}</nuxt-link>
						</li>
					</ul>
				</nav>
				<button class="order__btn">
					Оставить заявку
				</button>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
interface Navigation {
	name: String;
	link: string;
}

const props = defineProps({
	layoutNavigation: Array<Navigation>,
});

const isBurgerActive = ref(false);
</script>
<style lang="scss">
.header {
	width: 100%;
	position: fixed;
	z-index: 999;
	margin-top: 42px;

	@include mq($lg) { padding-inline: 32px }
}

.header-wr {
	border-radius: 32px;
	overflow: hidden;
	background-image: linear-gradient(#ffffff00, #ffffff09);
	box-shadow:
		inset 0 -2px 4px 0 #ffffff16,
		inset 0 2px 4px 0 #ffffff24;
	backdrop-filter: blur(4px);
	transition: 0.3s ease-out;

	.header__top {
		padding: 20px 32px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header__logo { margin-left: 42px }

	@include mq($xl) {
		.header__top { padding: 18px }

		.header__logo { margin-left: 20px }
	}

	@include mq($lg) {
		max-width: 420px;
		margin: auto;

		.header__top { padding: 18px 22px }

		&--active {
			width: calc(100vw - 64px);
			max-width: 600px;
			background-color: #c2c2c233;
		}

		.header__logo { margin-left: 12px; }
	}
}

.header__navigation {
	margin-left: -24px;

	ul {
		display: flex;
		align-items: center;
		gap: 62px;
	}

	li {
		font-size: clamp(0.88rem, calc(0.446rem + 0.67vw), 1.25rem);
		font-weight: 500;
	}

	a {
		position: relative;

		&::before {
			transform-origin: 100% 50%;
			transform: scale3d(0, 1, 1);
			transition:
				transform 0.4s,
				-webkit-transform 0.4s;
			content: "";
			height: 2px;
			width: 100%;
			background-color: #fff;
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

	@include mq($xl) {
		margin-left: 0;

		ul { gap: 16px; }
	}
}

.header__burger-btn {
	display: none;
	flex-direction: column;
	gap: 6px;

	&--active {
		div:nth-child(1) {
			transform: rotate(-45deg);
			top: 10px;
		}

		div:nth-child(2) { opacity: 0; }

		div:nth-child(3) {
			transform: rotate(45deg);
			top: -8px;
		}
	}

	div {
		width: 32px;
		height: 3px;
		background-color: #fff;
		transition: 0.3s ease-out;
		position: relative;
	}

	@include mq($lg) { display: flex }

	@include mq($sm) {
		gap: 5px;

		div {
			width: 26px;
			height: 2px;
		}

		&--active {
			div:nth-child(1) { top: 8px }

			div:nth-child(3) { top: -6px }

		}
	}
}

.header__bottom {
	max-height: 0;
	display: flex;
	flex-direction: column;
	transition: .3s;
	padding: 0px 22px;

	.order__btn {
		width: 50%;
		margin-top: 20px;
	}

	.header__navigation {
		ul {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	@include mq($lg) {
		&--active {
			max-height: 156px;
			padding-bottom: 12px;
		}
	}

	@include mq($sm) {
		.order__btn { width: 100% }
	}
}

.header__navigation--desktop,
.order__btn--desktop {
	display: block;

	@include mq($lg) { display: none }
}
</style>
