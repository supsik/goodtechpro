<template>
	<div class="about-us container">
		<swiper
			class="about-us__swiper"
			v-bind="swiperOptions"
			@swiper="onSwiper"
			@slide-change="onSlideChange"
		>
			<swiper-slide
				class="about-us__item"
				v-for="(slide, index) in data"
				:key="slide.image"
			>
				<div class="about-us__item-left">
					<h2>Немного о нас</h2>
					<div class="about-us__item-description" v-html="slide.content" />
				</div>
			</swiper-slide>
			<div class="about-us__custom-pagination">
				<div 
					v-for="(slide, index) in data" 
					:key="index"
					class="pagination-bullet"
					:class="{ 'active': currentIndex === index, 'completed': index < currentIndex }"
					@click="goToSlide(index)"
				>
					<div class="bullet-progress" :style="{ width: getBulletProgress(index) }"></div>
				</div>
			</div>
		</swiper>
	</div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import {
	Swiper,
	SwiperSlide
} from 'swiper/vue';
import {
	EffectFade,
	Autoplay
} from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/effect-fade';

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

const currentIndex = ref(0);
let swiperInstance: any = null;

const swiperOptions = ref<SwiperOptions>({
	slidesPerView : 1,
	effect        : 'fade',
	modules       : [ EffectFade, Autoplay ],
	fadeEffect: {
		crossFade: true
	},
	autoplay: {
		delay: 6000,
		disableOnInteraction: false,
	},
	loop: false,
	allowTouchMove: false,
});

const onSwiper = (swiper: any) => {
	swiperInstance = swiper;
};

const onSlideChange = (swiper: any) => {
	currentIndex.value = swiper.activeIndex;
};

const getBulletProgress = (index: number) => {
	if (index === currentIndex.value)
		return 'var(--progress-width)';

	return index < currentIndex.value ? '100%' : '0%';
};

const goToSlide = (index: number) => {
	if (swiperInstance) {
		swiperInstance.slideTo(index);

		if (swiperInstance.autoplay) {
			swiperInstance.autoplay.stop();
			swiperInstance.autoplay.start();
		}
	}
};

let progressAnimationFrame: any = null;
let startTime = 0;
const PROGRESS_DURATION = 6000;

const updateProgress = (timestamp: number) => {
	if (!startTime)
		startTime = timestamp;
	
	const elapsed = timestamp - startTime;
	const progress = Math.min((elapsed / PROGRESS_DURATION) * 100, 100);
	
	document.documentElement.style.setProperty('--progress-width', `${progress}%`);
	
	if (progress < 100)
		progressAnimationFrame = requestAnimationFrame(updateProgress);
	else
		cancelAnimationFrame(progressAnimationFrame);
};

watch(currentIndex, (newIndex, oldIndex) => {
	if (progressAnimationFrame) {
		cancelAnimationFrame(progressAnimationFrame);
		progressAnimationFrame = null;
	}
	startTime = 0;
	
	progressAnimationFrame = requestAnimationFrame(updateProgress);
	
	setTimeout(() => {
		if (!progressAnimationFrame)
			progressAnimationFrame = requestAnimationFrame(updateProgress);
	}, 10);
}, { immediate: true });

onUnmounted(() => {
	if (progressAnimationFrame)
		cancelAnimationFrame(progressAnimationFrame);
});
</script>

<style lang='scss'>
.about-us {
	padding-block: 52px;
}

.about-us__swiper {
	overflow: hidden;
	position: relative;
	padding-bottom: 80px;
}

.about-us__item {
	display: flex;
	justify-content: space-between;
}

.about-us__item-left {
	max-width: 900px;

	h2 {
		font-size: 52px;
		font-weight: 500;
	}
}

.about-us__item-description {
	margin-top: 32px;
	font-size: 28px;
	line-height: 1.5;

	ul {
		margin-top: 16px;
		padding-left: 32px;
	}
}

// Кастомная пагинация в виде вытянутых bullets
.about-us__custom-pagination {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	gap: 12px;
	padding: 20px 0;
	z-index: 10;
}

.pagination-bullet {
	width: 60px;
	height: 4px;
	background: rgba(255, 255, 255, 0.3);
	border-radius: 2px;
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;
	
	&:hover {
		background: rgba(255, 255, 255, 0.5);
		transform: scaleY(1.5);
	}
	
	// Заполненные предыдущие слайды - полностью белые
	&.completed {
		background: #ffffff;
		
		.bullet-progress {
			display: none;
		}
	}
	
	// Активный слайд
	&.active {
		background: rgba(255, 255, 255, 0.3);
		
		.bullet-progress {
			background: #ffffff;
			width: var(--progress-width, 0%);
			height: 100%;
			transition: width linear;
			border-radius: 2px;
		}
	}
}

.bullet-progress {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	background: #ffffff;
	border-radius: 2px;
	transition: width linear;
}

// Адаптив для мобильных устройств
@media (max-width: 768px) {
	.about-us__swiper {
		padding-bottom: 60px;
	}
	
	.about-us__custom-pagination {
		gap: 8px;
	}
	
	.pagination-bullet {
		width: 40px;
		height: 3px;
	}
	
	.about-us__item-left {
		max-width: 100%;

		h2 {
			font-size: 36px;
		}
	}

	.about-us__item-description {
		font-size: 20px;
	}
}

// Анимация для fade эффекта
.swiper-fade {
	.swiper-slide {
		transition-property: opacity;
	}
}
</style>