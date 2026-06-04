// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
	css: ['assets/scss/index.scss'],
	modules: [ '@vueuse/nuxt' ],
	app: {
		head: {
			title: 'GoodTech',
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
			],
		},
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
						@use "assets/scss/variables.scss" as *;
						@use "assets/scss/mixins.scss" as *;
					`,
				}
			}
		}
	}
})
