const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')



module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: '[name].js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			// loader配置
			{
				test: /\.css$/,
				// 多个loader用use
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin()
	],
	mode: 'development',
	// 解析模块的规则
	resolve: {
		// 配置解析模块路径别名 : import '$css/index.css'
		// 可以简写路径
		// 缺点写路径没提示
		alias: {
			$css: resolve(__dirname, 'src/css')
		},
		// 配置省略文件路径的后缀名 import '$css/index'
		extensions: ['.js', '.json', '.css', '.jsx', '.vue'],
		// 告诉webpack 解析模块是去找那个目录
		modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
	}
}