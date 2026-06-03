<template>
	<div class="why-us container">
		<h2 class="why-us__title">Почему мы?</h2>
		<ul class="why-us__list">
			<li class="why-us__list-item" v-for="(item, index) in data" :key="index">
				<div class="why-us__list-item-icon">
					<component :is="icons[item.icon]" />
				</div>
				<h3 class="why-us__list-item-title">{{ item.title }}</h3>
				<p class="why-us__list-item-description">{{ item.description }}</p>
			</li>
		</ul>
	</div>
</template>
<script setup lang="ts">
import IconsInvention from '~/components/Icons/invention.vue';
import IconsPerson    from '~/components/Icons/person.vue';
import IconsHands     from '~/components/Icons/hands.vue';

const icons = <Record<string, any>>{
	'icons-invention' : IconsInvention,
	'icons-person'    : IconsPerson,
	'icons-hands'     : IconsHands,
};

const data = ref([
	{
		title       : 'Профессиональная команда',
		description : 'Наша команда состоит из высококвалифицированных специалистов с богатым опытом в различных областях информационных технологий.',
		icon        : 'icons-person',
	},
	{
		title       : 'Индивидуальный подход',
		description : 'Мы понимаем, что каждый клиент уникален, и мы стремимся предоставить индивидуальные решения, которые соответствуют их конкретным потребностям и целям.',
		icon        : 'icons-hands',
	},
	{
		title       : 'Инновационные решения',
		description : 'Мы постоянно следим за последними тенденциями и технологиями в сфере информационных технологий, чтобы предоставлять нашим клиентам самые современные и эффективные решения.',
		icon        : 'icons-invention',
	}
])
</script>
<style lang='scss'>
.why-us {
	margin-top: 72px;

	@include mq($md) { margin-top: 42px }
}

.why-us__list {
	display: grid;
	margin-top: 52px;
	grid-template-columns: repeat(3, 1fr);
	gap: 32px;

	@include mq($lg) { grid-template-columns: 1fr }
}

.why-us__list-item {
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	cursor: default;

	& * {
		color: #ffffff56;
		transition: all 0.3s ease;
	}

	&:hover {
		& * { color: #fff }
	}

	.why-us__list-item-icon {
		width: 64px;
		height: 64px;

		svg {
			width: 100%;
			height: 100%;
		}
	}

	h3 {
		font-size: clamp(1.125rem, 0.8173rem + 0.4808vw, 1.25rem);
		margin-top: 16px;
	}

	p {
		margin-top: 8px;
		font-size: clamp(0.875rem, 0.5673rem + 0.4808vw, 1rem);
	}

	@include mq($lg) {
		width: 50%;

		h3 { font-size: clamp(0.875rem, 0.7336rem + 0.6116vw, 1.125rem) }

		p { font-size: clamp(0.75rem, 0.6793rem + 0.3058vw, 0.875rem) }
	}

	@include mq($md) {
		width: 100%;

		& * { color: #FFF }

		.why-us__list-item-icon {
			width: 48px;
			height: 48px;
		}
	}
}
</style>