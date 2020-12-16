const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bulit.js',
		path: resolve(__dirname, 'build'),
		publicPath: './' // 这里需要添加 配合html-loader 这里是webpack版本问题 可以选择降级
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
				// 处理图片资源
				// 问题： 默认处理不了html中的img图片
				test: /\.(jpg|png|gif)/,
				// npm i url-loader file-loader(url依赖于file)
				loader: 'url-loader', // 只使用一个loader
				options: {
					// 图片大小 <8kb 就会被base64处理
					// base64 能 减少请求数量(减轻服务器压力)
					// 缺点： base64图片体积会增大(文件请求速度更慢)
					// 一般处理8~12kb及其以下的图片
					limit: 8 * 1024,
					// url-loader 默认视同es模块进行解析
					// html-loader引入图片时commonjs
					// 解析时就会报错
					// 解决： 关闭url-loader 的es6模块化 使用commonjs
					esModule: false,
					// 重命名
					// 取图片hash值前十位
					// [ext] 图片的原扩展名
					name: '[hash:10].[ext]'
				}
			},
			{
				test: /\.html$/,
				// 处理html文件的img图片(负责引入img 从而被url-loader进行处理)
				loader: 'html-loader'
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