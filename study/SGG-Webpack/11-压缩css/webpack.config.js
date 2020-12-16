const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//  提取css
// npm i mini-css-extract-plugin -D 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 设置nodejs的环境变量
// process.env.NODE_ENV = 'development'

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
					MiniCssExtractPlugin.loader,
					'css-loader',
				   {
				       loader: 'postcss-loader',
				           ident: 'postcss',
				           options: {
				           postcssOptions: {
				               //或者将插件引入写在单独的配置js中
				               //config: './config/postcss.config.js',
				               plugins: () => [
				                   require('postcss-preset-env')()
				               ]
				           }
				       }
				   }
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/built.css'
		}),
		// 压缩css
		new OptimizeCssAssetsWebpackPlugin()
	],
	mode: 'development'
}