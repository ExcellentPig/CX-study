const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//  提取css
// npm i mini-css-extract-plugin -D 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
					// 创建style标签 将样式放入
					// 'style-loader',
					// 取代style-loader 提取js中的css成单独文件
					MiniCssExtractPlugin.loader,
					// 将css文件整合到js文件中
					'css-loader',
					/*
					css兼容性处理 postcss -> postcss-loader  postcss-preset-env
					帮postcss找到package.json中browserlist里面的配置，通过配置加载指定的css兼容性样式
					
					package.json中书写
					"browserlist": {
						  // 开发环境  -》 设置node环境变量: process.env.NODE_ENV = development
						  "development": [
							  "last 1 chrom version",
							  "last 1 firefox version",
							  "last 1 safari version"
						  ],
						  // 生产环境  默认是看生产环境的
						  "production": [
							  ">0.2%",
							  "not dead",
							  "not op_mini all"
						  ]
					}
					
					*/
				   // 第一种写法 使用loader的默认配置
				   // 'postcss-loader',
				   // 修改loader配置
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
			filename: 'css/built.css' // 重命名 指定文件夹和名字
		})
	],
	mode: 'development'
}