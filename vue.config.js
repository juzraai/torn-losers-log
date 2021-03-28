const webpack = require('webpack')

module.exports = {
	publicPath: '/torn-losers-log/',
	configureWebpack: _ => {
		return {
			plugins: [
				new webpack.DefinePlugin({
					'APP_VERSION': JSON.stringify(require('./package.json').version),
				})
			]
		}
	},
}
