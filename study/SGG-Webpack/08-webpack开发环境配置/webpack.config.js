
/*
  开发环境配置：
	能让代码运行
	webpack 会将打包结果输出
	npx webpack-dev-server 只会在内存中编译打包 没有输出
*/

const { resolve } = require('path')

const HtmlWebpackPlugun = require('html-webpack-plugin')

module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'js/bulit.js', //输出到对应目录
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(jpg|png|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 8 * 24,
					name: '[hash:10].[ext]',
					esModule: false,
					outputPath: 'images' // 输出到指定目录
				}
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				exclude: /\.(js|css|html|less|jpg|png|gif)/,
				loader: 'file-loader',
				options: {
					name: '[hash:10].[ext]',
					outputPath: 'media'
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugun({
			template: './src/index.html'
		})
	],
	devServer: {
		contentBase: resolve(__dirname, 'build'),
		compress: true,
		port: 3000,
		open: true
	}
}