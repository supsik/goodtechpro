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
.why-us__title {
	margin-top: 32px;
}

.why-us__list {
	display: grid;
	margin-top: 52px;
	grid-template-columns: repeat(3, 1fr);
	gap: 32px;
}

.why-us__list-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	& * {
		color: #d0d0d0;
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
		font-size: 20px;
		margin-top: 16px;
	}

	p {
		margin-top: 8px;
		font-size: 16px;
	}
}
</style>