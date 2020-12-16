const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bulit.js',
		path: resolve(__dirname, 'build'),
		publicPath: './'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			// 打包其他资源 除了 css/js/html
			{
				// 排查css,js,html资源
				exclude: /\.(css|js|html)$/,
				loader: 'file-loader',
				options: {
					name: '[hash:10].[ext]'
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	mode: 'development'
}