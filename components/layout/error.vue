<template>
	<div class="error container">
		<h1>Тут пока ничего нет :(</h1>
		<nuxt-link to="/">Вернуться на главную</nuxt-link>
	</div>
</template>
<script setup>
</script>
<style lang='scss'>
.error {
	display: flex;
	flex-direction: column;
	gap: 72px;
	justify-content: center;
	align-items: center;
	height: 100vh;

	h1 { font-size: 72px }

	a {
		width: 100%;
		max-width: 420px;
		height: 72px;
		border-radius: 40px;
		background: #FFF;
		display: grid;
		place-items: center;
		font-size: 24px;
		font-weight: 500;
		color: #32288C;
	}
}
</style>