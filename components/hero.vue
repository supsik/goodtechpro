<template>
	<div class="hero">
		<h1>GoodTech</h1>
		<span>История вашего сайта начинается здесь</span>
		<button class="hero__btn">Оставить заявку</button>
	</div>
</template>
<script setup>

</script>
<style lang='scss'>
.hero {
	height: 100vh;
	background-image: url('/images/hero-background.png');
	background-size: cover;
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		margin-top: 300px;
		font-size: 120px;
		font-weight: 900;
	}

	span {
		margin-top: 8px;
		font-size: 31px;
	}
}

.hero__btn {
	width: 320px;
	height: 62px;
	margin-top: 240px;
	border-radius: 24px;
	color: #32288C;
	font-size: 24px;
	font-weight: 500;
}
</style>