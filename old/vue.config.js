const fs = require('fs')
const webpack = require('webpack')

const packageJson = fs.readFileSync('./package.json', 'utf8')
const { version } = JSON.parse(packageJson)

const changelog = fs.readFileSync('./CHANGELOG.md', 'utf8')

module.exports = {
	publicPath: '/torn-losers-log/',
	configureWebpack: _ => {
		return {
			plugins: [
				new webpack.DefinePlugin({
					'APP_VERSION': JSON.stringify(version),
					'CHANGELOG': JSON.stringify(changelog)
				})
			]
		}
	},
}
