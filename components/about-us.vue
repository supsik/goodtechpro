<template>
	<div
		class="about-us container"
		@mousemove="handleMouseMove"
		@mouseleave="handleMouseLeave"
	>
		<div class="about-us__swiper-wrapper" :style="{ height: swiperHeight + 'px' }">
			<swiper
				class="about-us__swiper"
				v-bind="swiperOptions"
				@slide-change="onSlideChange"
				@swiper="setSwiperInstance"
			>
				<swiper-slide
					class="about-us__item"
					v-for="(slide, index) in data"
					:key="slide.image"
				>
					<div class="about-us__item-left">
						<h2>Немного о нас</h2>
						<div
							class="about-us__item-description" 
							v-html="slide.content"
							ref="slideContents"
						/>
					</div>
					<div 
						class="about-us__item-right"
					>
						<img 
							:src="slide.image" 
							:style="currentIndex === index ? imageTransform : {}"
						>
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<div class="about-us__pagination">
			<div 
				v-for="(_, index) in data" 
				:key="index"
				class="about-us__bullet"
				:class="{ 
					'about-us__bullet--active': currentIndex === index,
					'about-us__bullet--completed': currentIndex > index
				}"
				@click="goToSlide(index)"
			>
				<div 
					v-if="currentIndex === index" 
					class="about-us__bullet-progress"
					:style="{ width: progressWidth + '%' }"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	Swiper,
	SwiperSlide
} from 'swiper/vue';
import {
	EffectFade,
	Autoplay
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import type { SwiperOptions, Swiper as SwiperType } from 'swiper/types';

const { width } = useWindowSize();

const data = ref([
	{
		content : 'Мы — Good Tech. Мы не сторонние исполнители, а полноценное digital-звено вашей команды. Наша  миссия — стать техническим воплощением ваших целей: мы говорим на языке бизнеса и переводим его на язык безупречного кода, дизайна и цифровых  стратегий. Наша задача — ваш успех.',
		image   : '/images/about-us/slide-1.png',
	},
	{
		content : 'Мы работаем как единый организм и как часть вашей команды. Каждый  проект начинается с глубокого погружения: мы не угадываем, а вникаем в  суть вашего бизнеса. Этот подход позволяет нам выстроить четкий путь от  первой идеи до запуска и поддержки, где каждый этап логичен и  предсказуем.',
		image   : '/images/about-us/slide-2.png',
	},
	{
		content: `Наша методология строится на трех незыблемых принципах, которые превращают техническое задание в ценность:
			<ul>
				<li>Глубина вместо шаблона: Мы исследуем аудиторию и бизнес-логику, прежде чем нарисовать первую  кнопку. Наши решения — не набор трендов, а продуманная систему.</li>
				<li>Прочность архитектуры: Мы строим цифровые продукты на годы вперед. Чистый код, масштабируемые решения и безопасность — это не опции, а стандарт.</li>
				<li>Эмпатия в каждой детали: Мы всегда на стороне конечного пользователя. Удобство, скорость и ясность — главные критерии успеха любого нашего проекта.</li>
			</ul>`,
		image: '/images/about-us/slide-3.png',
	}
]);

const swiperInstance  = ref<SwiperType | null>(null);
const progressWidth   = ref(0);
const currentIndex    = ref(0);
const swiperHeight    = ref(0);

const imageTransform = ref({});

const handleMouseMove = (event: MouseEvent) => {
	if (width.value < 768)
		return;

	const target = event.currentTarget as HTMLElement;
	const rect = target.getBoundingClientRect();
	
	const mouseX = (event.clientX - rect.left) / rect.width;
	const mouseY = (event.clientY - rect.top) / rect.height;
	
	const rotateY = (mouseX - 0.5) * 30;
	const rotateX = (mouseY - 0.5) * -30;

	const translateX = (mouseX - 0.5) * 40;
	const translateY = (mouseY - 0.5) * 40;
	
	imageTransform.value = {
		transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px) scale3d(1.05, 1.05, 1.05)`,
		transition: 'transform 0.1s ease-out'
	};
};

const handleMouseLeave = () => {
	imageTransform.value = {
		transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) scale3d(1, 1, 1)',
		transition: 'transform 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1)'
	};
};

const swiperOptions = ref<SwiperOptions>({
	slidesPerView  : 1,
	effect         : 'fade',
	loop           : false,
	allowTouchMove : true,
	modules        : [EffectFade, Autoplay],
	fadeEffect: {
		crossFade: true
	},
	autoplay: {
		delay                : 5000,
		disableOnInteraction : false,
		pauseOnMouseEnter    : true
	},
	breakpoints: {
		768: {
			allowTouchMove : false,
		}
	},
	on: {
		autoplayTimeLeft: (swiper: SwiperType, timeLeft: number, progress: number) => {
			progressWidth.value = progress * 100;
		}
	}
});

const setSwiperInstance = (swiper: SwiperType) => {
	swiperInstance.value = swiper;
	progressWidth.value = 0;
	updateHeight();
};

const onSlideChange = (swiper: SwiperType) => {
	currentIndex.value = swiper.activeIndex;
	updateHeight();
	imageTransform.value = {};
};

const updateHeight = () => {
	nextTick(() => {
		const activeSlide = document.querySelector('.swiper-slide-active');
		if (activeSlide) {
			const height = activeSlide.scrollHeight;
			swiperHeight.value = height;
		}
	});
};

const goToSlide = (index: number) => {
	if (swiperInstance.value && index !== currentIndex.value) {
		swiperInstance.value.slideTo(index);
		progressWidth.value = 0;
		
		if (swiperInstance.value.autoplay) {
			swiperInstance.value.autoplay.stop();
			swiperInstance.value.autoplay.start();
		}
	}
};

const handleResize = () => {
	if (swiperInstance.value)
		updateHeight();
};

onMounted(() => {
	window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
	window.removeEventListener('resize', handleResize);
});
</script>

<style lang='scss'>
.about-us {
	padding-block: 52px;

	@include mq($md) { padding-block: 32px }
}

.about-us__swiper-wrapper {
	transition: height 0.3s ease;
	overflow: visible;
}

.about-us__swiper {
	overflow: visible;
	position: relative;
}

.about-us__item {
	display: flex;
	justify-content: space-between;
	gap: 24px;
}

.about-us__item-left {
	max-width: 900px;
}

.about-us__item-right {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	
	img {
		height: 400px;
		will-change: transform;
		backface-visibility: hidden;
	}

	@include mq($xl) {
		img { height: 240px }
	}

	@include mq($lg) {
		img { height: 200px }
	}

	@include mq($md) { display: none }
}

.about-us__item-description {
	margin-top: 32px;
	font-size: 28px;
	line-height: 1.5;

	ul {
		margin-top: 16px;
		padding-left: 32px;
	}

	li {
		list-style: circle;
		list-style-type: disc;
	}

	@include mq($xl) {
		margin-top: 24px;
		font-size: 22px;
	}

	@include mq($lg) {
		margin-top: 20px;
		font-size: clamp(0.8rem, calc(0.4014rem + 1.5075vw), 1.125rem);
	}
}

.about-us__pagination {
	display: flex;
	gap: 12px;
	margin-top: 42px;
	position: relative;
	z-index: 3;
}

.about-us__bullet {
	width: 130px;
	height: 6px;
	background: #0C1448;
	border-radius: 4px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: all 0.3s ease;
	
	&:hover {
		background: #101b61;
		transform: scaleY(1.5);
	}
	
	&--completed { background: #FFF }
	
	&--active { background: #FFF }

	@include mq($lg) {
		width: 90px;
		height: 4px;
	}

	@include mq($md) {
		&:hover { background: #FFF; transform: none }
	}
}

.about-us__bullet-progress {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	background: #000000;
	border-radius: 2px;
	transition: width linear;
}
</style>