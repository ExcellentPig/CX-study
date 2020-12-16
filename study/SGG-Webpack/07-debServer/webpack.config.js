const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bulit.js',
		path: resolve(__dirname, 'build')
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
	mode: 'development',
	// 开发服务器  devServer 用来自动化( 自动编译  自动打开浏览器 自动刷新浏览器)
	// 特点： 只会在内存中编译打包 而不会有任何输出
	// 启动指令： npx webpack-dev-server  
	// npm i webpack-dev-server
	devServer: {
		contentBase: resolve(__dirname, 'bulid'),
		// 启动gzip 压缩
		compress: true,
		// 端口号
		port: 3000,
		// 自动打开浏览器
		open: true
	}
}