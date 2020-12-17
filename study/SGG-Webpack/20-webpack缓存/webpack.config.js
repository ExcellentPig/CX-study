/**
 * 缓存
 * 	babel缓存
 * 		cacheDirectory: true
 *  文件资源缓存
 * 		hash： 每次webpack构建时会生成一个唯一的hash值
 * 			问题：因为js和css同时使用一个hash值，如果重新打包会导致所有缓存实现(可能我只改变了一个文件，导致所有缓存失效)
 * 		chunkhash: 根据chunk生成的hash值
 * 					如果打包来源于同一个chunk，hash值就一样
 *			问题：js和css的hash值还是一样的
 * 				因为css是在js中引入的，所以同属一个chunk
 *		contenthash: 根据文件的内容生成hash值，不同文件的内容hash值就不一样
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
	entry: './src/js/index.js',
	output: {
		// filename: 'js/built.[hash:10].js',
		// filename: 'js/built.[chunk:10].js',
		filename: 'js/built.[contenthash:10].js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			/**
			 * 正常情况下 一个文件只能被一个loade处理
			 * 	一个文件要被多个文件处理 需要清楚loader的执行顺序
			 *  	先执行eslint 在执行babel
			 * 		enforce 可以指定优先执行
			 */
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
			// oneOf 一下loader只会匹配一个
			// 注意:不能有两项配置处理同一个类型的文件
			{
				oneOf: [
					{
						test: /\.css$/,
						use: [...commonCssLoader]
					},
					{
						test: /\.less/,
						use: [...commonCssLoader]
					},
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
							],
							// 开启babel缓存 第二次构建时才会读取缓存
							cacheDirectory: true
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
			}
		]
	},
	plugins: [
		new MiniCssExtracPlugin({
			// filename: 'css/built.[hash:10].css'
			// filename: 'css/built.[chunk:10].css'
			filename: 'css/built.[contenthash:10].css'
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
	devtool: 'source-map'
}
