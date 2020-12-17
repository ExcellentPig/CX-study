


const { resolve } = require('path') 

const HtmlWebpackPlugin = require('html-webpack-plugin')

const Webpack = require('webpack')
/**
 * npm i add-asset-html-webpack-plugin -D
 */
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'built.js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		// 告诉webpack那些库不参与打包
		// 同时 使用时名称也需要改
		new Webpack.DllReferencePlugin({
			manifest: resolve(__dirname, 'dll/manifest.json')
		}),
		// 将某个文件打包输出出去，并在html文件中自动引入该资源
		new AddAssetHtmlWebpackPlugin({
			filepath: resolve(__dirname, 'dll/jquery.js')
		})
	],
	mode: 'development'
}