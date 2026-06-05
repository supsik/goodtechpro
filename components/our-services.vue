<template>
	<div class="our-services container">
		<h2>Наши услуги</h2>
		<div class="our-services__content">
			<div
				class="our-services__item"
				v-for="item in servicesData"
			>
				<div class="our-services__item-bg" />
				<div class="our-services__item-content">
					<img :src="item.icon" :alt="item.title">
					<h3>{{ item.title }}</h3>
					<span>{{ item.description }}</span>
					<a href="#request-form" :aria-label="`Ссылка на ${item.title}`">Подробнее →</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
const servicesData = ref([
	{
		title       : 'Разработка web-сайтов',
		description : 'Наша команда создает современные и эффективные сайты. Мы превращаем ваши идеи в работающие решения, которые привлекают клиентов и растут вместе с бизнесом.',
		icon        : '/images/laptop.png',
	},
	{
		title       : 'Разработка web-сайтов',
		description : 'Наша команда создает современные и эффективные сайты. Мы превращаем ваши идеи в работающие решения, которые привлекают клиентов и растут вместе с бизнесом.',
		icon        : '/images/laptop.png',
	},
	{
		title       : 'Разработка web-сайтов',
		description : 'Наша команда создает современные и эффективные сайты. Мы превращаем ваши идеи в работающие решения, которые привлекают клиентов и растут вместе с бизнесом.',
		icon        : '/images/laptop.png',
	},
	{
		title       : 'Разработка web-сайтов',
		description : 'Наша команда создает современные и эффективные сайты. Мы превращаем ваши идеи в работающие решения, которые привлекают клиентов и растут вместе с бизнесом.',
		icon        : '/images/laptop.png',
	},
	{
		title       : 'Разработка web-сайтов',
		description : 'Наша команда создает современные и эффективные сайты. Мы превращаем ваши идеи в работающие решения, которые привлекают клиентов и растут вместе с бизнесом.',
		icon        : '/images/laptop.png',
	},
	{
		title       : 'Разработка web-сайтов',
		description : 'Наша команда создает современные и эффективные сайты. Мы превращаем ваши идеи в работающие решения, которые привлекают клиентов и растут вместе с бизнесом.',
		icon        : '/images/laptop.png',
	}
])
</script>
<style lang='scss'>
.our-services {
	position: relative;
	z-index: 2;

	h2 { margin-top: 52px }
}

.our-services__content {
	margin-top: 42px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 30px;

	@include mq($xl) { grid-template-columns: repeat(2, 1fr) }

	@include mq($md) {
		margin-top: 24px;
		grid-template-columns: 1fr;
		gap: 18px;
	}
}

.our-services__item {
	position: relative;
	transition: .3s;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 4px 6px 0 #00000050;

		.our-services__item-bg { opacity: .55 }

		.our-services__item-content { opacity: 1 }
	}

	@include mq($md) {
		width: 70%;
		min-width: 350px;
		margin: 0 auto;
	}

	@include mq($sm) {
		width: 100%;
		min-width: 100%;
	}
}

.our-services__item-bg {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	background-image: linear-gradient(#000000a3, #000);
	opacity: .22;
	transition: .3s;
}

.our-services__item-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 32px;
	position: relative;
	z-index: 3;
	opacity: .4;
	transition: .3s;
	
	img { width: 34% }

	h3 {
		font-size: clamp(1.25rem, calc(0.917rem + 0.694vw), 1.75rem);
		margin-top: 18px;
	}

	span {
		margin-top: 12px;
		font-size: clamp(0.75rem, calc(0.583rem + 0.347vw), 1.00rem);
		text-align: center;
	}

	a {
		font-size: 18px;
		font-weight: 500;
		margin-top: 28px;
	}

	@include mq($md) {
		padding: 24px;

		img { width: 20% }

		h3 {
			margin-top: 14px;
			font-size: clamp(1.13rem, calc(0.776rem + 1.508vw), 1.50rem);
		}

		span {
			margin-top: 10px;
			font-size: clamp(0.88rem, calc(0.526rem + 1.508vw), 1.25rem);
		}

		a {
			margin-top: 20px;
			font-size: 16px;
		}
	}

	@include mq($sm) { opacity: 1 }
}
</style>