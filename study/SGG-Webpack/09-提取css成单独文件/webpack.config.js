const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//  提取css
// npm i mini-css-extract-plugin -D 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'js/built.js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					// 创建style标签 将样式放入
					// 'style-loader',
					// 取代style-loader 提取js中的css成单独文件
					MiniCssExtractPlugin.loader,
					// 将css文件整合到js文件中
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/built.css' // 重命名 指定文件夹和名字
		})
	],
	mode: 'development'
}