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
	mode: 'production'
}
