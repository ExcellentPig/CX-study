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

/**
 * source-map 一种提供源代码到构建后代码映射的技术(如果构建后的代码出错了，通过映射关系可以追踪到源代码的错误)
 * 		利于调试和寻找错误
 * 		[inline-|hidden-|eval-|][nosources-][cheap-[module-]]sourcee-map
 * 		source-map 外部
 * 			提示错误代码的准确信息和源代码的错误位置
 * 		inline-source-map 内联 没有生成外部文件 速度更快 只生成一个内联的source-map
 * 			提示错误代码的准确信息和源代码的错误位置
 * 		hidden-source-map 外部
 * 			提示错误代码原因但是没有错误位置，只提供了构建后的代码错误位置
 * 		eval-source-map 也是内联 每一个文件都在eval中生产source-map
 * 			提示错误代码原因但是没有错误位置，只提供了构建后的代码错误位置，有hash值
 * 		nosources-source-map 外部
 * 			提示错误代码的准确信息 但是没有任何源代码的信息
 * 		cheap-source-map 外部
 * 			提示错误代码的准确信息和位置 只能精确到行不知道具体那一列
 * 		cheap-module-source-map 外部
 * 			提示错误代码的准确信息和位置 只能精确到行不知道具体那一列
 * 			module会将loader的source map加入
 * 
 * 	生产环境：源代码要不要隐藏，调试要不要更友好
 * 		隐藏
 * 			nosources-source-map  全部隐藏
 * 			hidden-source-map   只隐藏源代码
 * 		内联会使代码体积大 所以生产一般不用内联
 *		调试友好
 * 			 source-map
 *  开发环境：速度快，调试友好
 * 		速度快(eval > inline > cheap > ...)
 * 			eval-cheap-source-map 可以组合 更快
 * 			eval-sorce-map
 * 		调试更友好
 * 			source-map
 * 			cheap-module-sorce-map
 * 			cheap-soucre-map
 * 		eval-source-map（vue,react） / eval-cheap-module-source-map
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
	},
	// 使用source-map
	devtool: 'inline-source-map'
}
