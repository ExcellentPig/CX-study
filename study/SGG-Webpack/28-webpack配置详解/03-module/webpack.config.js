const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')



module.exports = {
	entry: './src/index.js',
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
			},
			{
				test: /\.js$/,
				// 排除node_modules下的js文件
				exclude: /node_modules/,
				// 只检查src下的js文件
				include: resolve(__dirname, 'src'),
				// 优先执行pre  延后执行 post 不写就是中间执行
				enforce: 'pre',
				// 单个loader
				loader: 'eslint-loader',
				options: {}
			},
			{
				// 一下配置只会生效一个
				oneOf:[]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin()
	],
	mode: 'development'
}