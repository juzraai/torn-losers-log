const webpack = require('webpack')

module.exports = {
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
