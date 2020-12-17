/**
 * 性能优化
 * 1、开发环境性能优化
 * 	优化打包构建速度
 *  优化代码调试
 * 
 * 2、生产环境性能优化
 * 	优化打包构建速度
 *  优化代码运行的性能
 */

/*
	HMR  hot module replacement 模块热替换
		一个模块发生变化只会从新打包这一个模块 而不是打包所有
		极大的提升代码的构建速度
		
		样式文件： 可以使用HMR 功能 因为style-loader内部实现了
		js文件：默认不能使用HMR功能
			解决： 修改js代码 添加支持HMR的代码 看index.html
			注意：HMR功能对js文件的处理 只能处理非入口文件的其他文件
		html文件：默认不能使用HMR功能 同时会使页面不能热更新了(不用做HMR功能)
			解决 entry: ['./src/js/index.js', './src/index.html'], 引入html文件entry
*/

const {
	resolve
} = require('path')
const MiniCssExtracPlugin = require('mini-css-extract-plugin')

const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

// 定义nodejs环境 来决定使用browserlist的那个环境
process.env.NODE_ENV = 'production'

// 复用
const commonCssLoader = [
	MiniCssExtracPlugin.loader,
	'css-loader',
	{
		// 需要在package.json中定义 browserlist
		loader: 'postcss-loader',
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

module.exports = {
	entry: ['./src/js/index.js', './src/index.html'],
	output: {
		filename: 'js/built.js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [...commonCssLoader]
			},
			{
				test: /\.less/,
				use: [...commonCssLoader]
			},
			{
				// 在 package.json添加eslintConfig配置  aribnb
				test: /\.js$/,
				exclude: /node_modules/,
				// 优先执行
				enforce: 'pre',
				loader: 'eslint-loader',
				options: {
					fix: true
				}
			},
			/**
			 * 正常情况下 一个文件只能被一个loade处理
			 * 	一个文件要被多个文件处理 需要清楚loader的执行顺序
			 *  	先执行eslint 在执行babel
			 * 		enforce 可以指定优先执行
			 */
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					// 预设：指示babel做怎么样的兼容性处理
					presets: [ // 注意这里需要两个数组包裹
						['@babel/preset-env',
						{
							// 按需加载
							useBuiltIns: 'usage',
							// 知道corejs的版本
							corejs: {
								version: 3 // 注意corejs的版本
							},
							// 指定兼容性做到那个版本浏览器
							targets: {
								chrome: '60',
								firefox: '60',
								ie: '9',
								safari: '10',
								edge: '17'
							}
						}]
					]
				}
			},
			{
				test: /\.(jpg|png|gif)/,
				loader: 'url-loader',
				options: {
					limit: 8 * 1024,
					name: '[hash:10].[ext]',
					outputPath: 'images',
					esModule: false
				}
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				exclude: /\.(js|css|less|html|jpg|gif|png)/,
				loader: 'file-loader',
				options: {
					outputPath: 'media'
				}
			}
		]
	},
	plugins: [
		new MiniCssExtracPlugin({
			filename: 'css/built.css'
		}),
		new OptimizeCssAssetsWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true
			}
		})
	],
	mode: 'production',
	devServer: {
		contentBase: resolve(__dirname, 'build'),
		compress: true,
		port: 3000,
		open: true,
		// 开启HMR功能
		hot: true
	}
}
