const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'js/built.js',
		path: resolve(__dirname, 'bulid')
	},
	module: {
		rules: [
			/**
			 * 语法检查  eslint-loader 依赖于eslint
			 * npm install eslint eslint-loader -D
			 *  只检查自己写的源代码 第三方的库不用检查
			 *  设置检查规则
			 * 		package.json中设置 eslintConfig
			 * 		airbnb
			 * 			npm i xxx -D
			 * 			eslint-config-airbnb-base
			 * 			eslint
			 * 			eslint-plugin-import
			 * 
			 * "eslistConfig": {
					"extends": "airbnb-base"
				}
			 * 			
			 */
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					// 自动修复lint错误
					fix: true
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