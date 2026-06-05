<template>
	<div class="cases-wr container">
		<h2>Наши проекты</h2>
		<div class="cases__content">
			<div
				class="cases__item-wrapper"
				v-for="(item, index) in data"
				:key="index"
				@mousemove="handleMouseMove($event, index)"
				@mouseleave="handleMouseLeave(index)"
			>
				<a :href="item.link" class="cases__item" :style="imageTransforms[index]">
					<img :src="item.image" alt="">
					<div class="cases__item-content">
						<h3>{{ item.name }}</h3>
						<p>{{ item.description }}</p>
					</div>
				</a>
			</div>
		</div>
	</div>
</template>

<script setup>
const { width } = useWindowSize();

const data = ref([
	{
		name        : 'YouTube',
		link        : 'https://www.youtube.com/',
		image       : '/images/projects/image.png',
		description : 'Lorem Ipsum Test Text for content fill some text some bullshit'
	},
	{
		name        : 'YouTube',
		link        : 'https://www.youtube.com/',
		image       : '/images/projects/image.png',
		description : 'Lorem Ipsum Test Text for content fill some text some bullshit Lorem Ipsum Test Text for content fill some text some bullshit'
	},
	{
		name        : 'YouTube',
		link        : 'https://www.youtube.com/',
		image       : '/images/projects/image.png',
		description : 'Lorem Ipsum Test Text for content fill some text some bullshit'
	},
	{
		name        : 'YouTube',
		link        : 'https://www.youtube.com/',
		image       : '/images/projects/image.png',
		description : 'Lorem Ipsum Test Text for content fill some text some bullshit'
	},
	{
		name        : 'YouTube',
		link        : 'https://www.youtube.com/',
		image       : '/images/projects/image.png',
		description : 'Lorem Ipsum Test Text for content fill some text some bullshit'
	},
]);

const imageTransforms = ref({})

const handleMouseMove = (event, index) => {
	if (width.value <= 768)
		return

	const target = event.currentTarget;
	const rect = target.getBoundingClientRect();
	
	const mouseX = (event.clientX - rect.left) / rect.width;
	const mouseY = (event.clientY - rect.top) / rect.height;
	
	const rotateY = (mouseX - 0.5) * 20;
	const rotateX = (mouseY - 0.5) * -20;

	const translateX = (mouseX - 0.5) * 30;
	const translateY = (mouseY - 0.5) * 30;
	
	imageTransforms.value[index] = {
		transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px) scale3d(1.03, 1.03, 1.03)`,
		transition: 'transform 0.15s ease-out'
	};
};

const handleMouseLeave = (index) => {
	imageTransforms.value[index] = {
		transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) scale3d(1, 1, 1)',
		transition: 'transform 0.35s ease-out'
	};
};

useSeoMeta({
	title         : 'GoodTech - Наши проекты',
	ogTitle       : 'GoodTech - Наши проекты',
	description   : 'Список разрабатываемых, завершенных и поддерживаемых проектов компании GoodTech',
	ogDescription : 'Список разрабатываемых, завершенных и поддерживаемых проектов компании GoodTech',
});
</script>

<style lang='scss'>
.cases__content {
	margin-top: 32px;
	display: grid;
	gap: 42px;
	grid-template-columns: repeat(3, 1fr);

	@include mq($xl) { grid-template-columns: repeat(2, 1fr) }

	@include mq($md) { grid-template-columns: 1fr }
}

.cases__item-wrapper {
	position: relative;
}

.cases__item {
	height: 100%;
	display: flex;
	flex-direction: column;
	text-decoration: none;
	will-change: transform;

	img {
		width: 100%;
		aspect-ratio: 3 / 2;
	}
}

.cases__item-content {
	height: 100%;
	padding: 24px;
	background-color: rgba($color: #000, $alpha: .4);
	display: flex;
	flex-direction: column;

	h3 { font-size: 24px }

	p {
		margin-top: 12px;
		font-size: clamp(0.875rem, 0.7588rem + 0.5025vw, 1rem);
	}

	@include mq($md) { padding: 14px 16px }
}
</style>