const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// npm i
const TerserWebpackPlugin = require('terser-webpack-plugin')


module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'js/[name].[contenthash:10].js',
		path: resolve(__dirname, 'build'),
		chunkFilename: 'js/[name]_[contenthash:10]chunk.js'
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
	mode: 'production',
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
	},
	devServer: {
		// 适用于开发环境
		// 运行代码的目录
		contentBase: resolve(__dirname, 'build'),
		watchContentBase: true, // 监视contentBase目录下的所有文件， 一旦变化就会reload
		watchOptions: {
			ignored: /node_modules/, //忽略文件
		},
		compress: true, // 启动gzip压缩
		port: 5000, // 端口号
		host: 'localhsot', //域名
		open: true, //自动打开浏览器
		hot: true, // 开启HMR功能
		clientLogLevel: 'noen', // 不要显示启动服务器的日志信息
		quiet: true, // 除了一些基本的启动信息以为其他内容都不要打印
		overlay: false, // 如果出现错误 不要全屏提示
		proxy: {  // 服务器代理  解决开发环境跨域问题
			'/api': { // 一旦devServer(5000)服务器接收到请求 /api 就会把请求转发到3000服务器
				target: 'http://lcoalhost:3000',
				pathRewrite: { // 发送请求时，请求路径重写 将/api/xx 改成/xx 去掉api
					'^/api': ''
				}
			}
		},
	},
	optimization: { // 生产环境
		splitChunks: {
			chunks: 'all',
			/**
			 * 一下是默认值，可以不写
			 */
			// minSize: 30 * 1024, // 分割的chunk最小为30kb
			// maxSize: 0, // 0 代表最大没有限制
			// minChunks: 1, // 要提取的chunks最少被引用1次
			// maxAsyncRequests: 5, // 按需加载的时候 并行加载的文件最大数量为5
			// maxInitialRequests: 3, // 入口js文件最大并行请求数量
			// automaticNameDelimiter: '~', // 名称连接符
			// name: true, // 可以使用命名规则
			// cacheGroups: { // 分割chunk的组
			// 	// node_modules文件会被打包到vendors的组的chunk中
			// 	// vendors~xxx.js
			// 	// 满足上面的公共规则： 如大小超过30kb 至少被引用一次...
			// 	vendors: {
			// 		test: /[\\/]node_modules[\\/]/,
			// 		// 打包的优先级为-10
			// 		priority: -10 
			// 	},
			// 	default: {
			// 		// 要提取的chunks最少被引用2次
			// 		minChunks: 2,
			// 		priority: -20,
			// 		// 如果当前要打包的模块和之前已经被提取的模块是同一个就会复用 而不是重新打包模块
			// 		reuseExistingChunk: true
			// 	}
			// }
		},
		// 将当点模块的记录其他模块的hash值单独打包为一个文件 runtime
		// 解决： 修改a文件导致b文件的contenthash值变化
		runtimeChunk: {
			name: entrypoint => `runtime-${entrypoint.name}`
		},
		// minimizer: [
		// 	// 配置生产环境的压缩方案： js和css
		// 	new TerserWebpackPlugin({
		// 		// 开启缓存
		// 		cache: true,
		// 		// 开启多进程打包
		// 		parallel: true,
		// 		// 启动source-map
		// 		sourceMap: true
		// 	})
		// ]
	}
}