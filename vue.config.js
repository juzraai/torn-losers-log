const RemarkHTML = require('remark-html')

module.exports = {
	chainWebpack: config => {
		config.module
			.rule('md')
			.test(/\.md$/)
			.use('html-loader')
			.loader('html-loader')
			.end()
			.use('remark-loader')
			.loader('remark-loader')
			.options({
				remarkOptions: {
					plugins: [RemarkHTML],
				},
			})
			.end()
	}
}
