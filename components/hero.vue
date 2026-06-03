<template>
	<div class="hero">
		<h1>GoodTech</h1>
		<span>История вашего сайта начинается здесь</span>
		<a href="#request-form" class="order__btn">Оставить заявку</a>
	</div>
</template>
<script setup></script>
<style lang="scss">
.hero {
	height: 100vh;
	background-image: url("/images/hero-background.webp");
	background-size: cover;
	background-position: bottom;
	display: flex;
	flex-direction: column;
	align-items: center;

	.order__btn {
		width: 320px;
		height: 62px;
		margin-top: 16vh;
		border-radius: 24px;
		color: #32288c;
		font-size: 24px;

		@include mq($lg) {
			width: 240px;
			height: 52px;
			border-radius: 18px;
			margin-top: 12vh;
			font-size: 18px;
		}

		@include mq($md) {
			margin-top: 8vh;
		}
	}

	h1 {
		margin-top: 26vh;
		font-size: 120px;
		font-weight: 900;
	}

	span {
		margin-top: 8px;
		font-size: 31px;
	}

	@include mq($lg) {
		height: 80vh;

		h1 {
			margin-top: 28vh;
			font-size: 92px;
		}

		span {
			font-size: 24px;
		}
	}

	@include mq($md) {
		height: 52vh;

		h1 {
			margin-top: 20vh;
			font-size: clamp(3.25rem, calc(0.865rem + 10.178vw), 5.75rem);
		}

		span { font-size: clamp(0.88rem, calc(0.279rem + 2.545vw), 1.50rem) }
	}
}
</style>
