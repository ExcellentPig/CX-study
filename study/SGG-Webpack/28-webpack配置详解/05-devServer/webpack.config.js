const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')



module.exports = {
	entry: './src/js/index.js',
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
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin()
	],
	mode: 'development',
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
	}
}