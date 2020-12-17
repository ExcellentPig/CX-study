

const { resolve } = require('path') 

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'built.js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: []
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	mode: 'production',
	externals: {
		// 拒绝jquery这个包被打包进来
		// 需要手动引进
		// 忽略库名 -- npm包名
		jquery: 'jQuery'
	}
}