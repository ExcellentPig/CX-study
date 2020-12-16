/**
 * webpack.config.js webpack配置文件
 * 	作用：指示webpack做哪些事情 运行指令的时候 会加载其中的配置
 *  所有构建工具都是基于nodejs平台运行的 模块化使用commonJS
 */

// resolve 用来拼接绝对路径的方法
const { resolve } = require('path')

module.exports = {
	// webpack 配置
	entry: './src/index.js', // 入口起点
	//输出
	output: {
		// 输出文件名
		filename: 'bulit.js',
		// 输出路径 __dirname 代表当前文件的目录绝对路径
		path: resolve(__dirname, 'build')
	},
	// loader配置
	module: {
		rules: [
			// 详细loader配置
			// 不同文件必须配置不同的loader处理
			{
				// 代表匹配哪些文件
				test: /\.css$/,
				// 使用哪些loader进行处理
				use: [
					// use数组中loader执行顺序，从右到左 或者从下到上依次执行
					// 串接一个style标签 将js中的css样式资源插入进行， 添加到head中生效
					'style-loader',
					// 将css文件变成commonjs模块加载到js中，里面的内容是样式字符串
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					// 将less文件编译成css文件
					// 需要下载less 和 less-loader
					'less-loader'
				]
			}
		]
	},
	// plugin 插件配置
	plugins: [
		// 详细配置
	],
	// 模式
	mode: 'development'
}

