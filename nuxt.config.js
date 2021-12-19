import fs from 'fs';

const packageJson = fs.readFileSync('./package.json', 'utf8');
const changelog = fs.readFileSync('./CHANGELOG.md', 'utf8');
const { version } = JSON.parse(packageJson);

export default {
	axios: {
		baseURL: 'https://api.torn.com' // TORN is the only API we use, in services/torn.js
	},
	bootstrapVue: {
		bootstrapCSS: false,
		bootstrapVueCSS: false,
		componentPlugins: [
			// 'LayoutPlugin',
			'FormPlugin',
			// 'FormCheckboxPlugin',
			'FormInputPlugin',
			// 'FormRadioPlugin',
			'ToastPlugin',
			// 'ModalPlugin'
		],
		directivePlugins: [
			// 'VBPopoverPlugin',
			'VBTooltipPlugin',
			// 'VBScrollspyPlugin',
		],
		components: [
			'BButton',
			'BButtonGroup',
			'BOverlay',
			'BFormGroup',
			'BFormInput',
			// 'BFormRadioGroup',
			// 'BTooltip',
		],
	},
	build: {
		babel: {
			compact: true,
		},
	},
	buildModules: [
		'@nuxtjs/eslint-module',
		'@nuxtjs/google-fonts'
	],
	components: true,
	css: [
		'@/assets/style.scss'
	],
	dayjs: {
		plugins: [
			'utc',
		],
	},
	head: {
		title: 'TLL',
		titleTemplate: '%s | TLL',
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
		// TODO favicon, fonts, rewrite description
	},
	googleFonts: {
		display: 'swap',
		families: {
			'Roboto+Condensed': [400, 700],
		},
	},
	loading: {
		color: '#007bff', // $primary
	},
	modules: [
		'bootstrap-vue/nuxt',
		'@nuxtjs/axios',
		'@nuxtjs/dayjs',
	],
	plugins: [
		'@/plugins/formatters.client.js',
		'@/plugins/init.client.js',
		'@/plugins/storage.client.js',
		'@/plugins/timeago.js',
		'@/plugins/toasts.client.js',
	],
	publicRuntimeConfig: {
		APP_VERSION: JSON.stringify(version),
		BUILD_TIMESTAMP: new Date().getTime(),
		CHANGELOG: JSON.stringify(changelog)
	},
	target: 'static',
};
