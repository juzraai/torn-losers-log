import fs from 'fs';

const packageJson = fs.readFileSync('./package.json', 'utf8');
const changelog = fs.readFileSync('./CHANGELOG.md', 'utf8');
const { version } = JSON.parse(packageJson);

export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'TORN City Losers\' Log',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'TLL is a tool which aims to help TORN City\'s loss sellers by providing them automatic counting, performance statistics and a proof system.' }
		],
		link: [
			{
				rel: 'stylesheet',
				href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
			},
			{
				rel: 'stylesheet',
				href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/fontawesome.min.css'
			}
		],
		// TODO favicon, fonts
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['@/assets/style.scss'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'@/plugins/timeago.js',
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/bootstrap
		'bootstrap-vue/nuxt',
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
	],

	publicRuntimeConfig: {
		APP_VERSION: JSON.stringify(version),
		BUILD_TIMESTAMP: new Date().getTime(),
		CHANGELOG: JSON.stringify(changelog)
	},

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},

	bootstrapVue: {
		bootstrapCSS: false,
		bootstrapVueCSS: false,
		componentPlugins: [
			// 'LayoutPlugin',
			'FormPlugin',
			// 'FormCheckboxPlugin',
			'FormInputPlugin',
			// 'FormRadioPlugin',
			// 'ToastPlugin',
			// 'ModalPlugin'
		],
		directivePlugins: [
			// 'VBPopoverPlugin',
			'VBTooltipPlugin',
			// 'VBScrollspyPlugin',
		],
		components: [
			'BButton',
		]
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		babel: {
			compact: true,
		},
	},
};
