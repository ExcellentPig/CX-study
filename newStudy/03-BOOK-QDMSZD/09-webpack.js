/*
优化loader
*/
// 优化Loader 的文件搜索范围
module.exports = {
	module: {
		rules: [
			{
				// js文件才使用babel
				test: /\.js$/,
				loader: 'babel-loader',
				// 只在src文件夹下查找
				include: [
					resolve('src')
				],
				// 不会去查找的目录
				exclude: /node_modules/
			}
		]
	}
}
// 将Babel编译过来的文件缓存起来 下次只需编译更改过的代码文件即可
loader: 'babel-loader?cacheDirectory=true'

/*
HappPack
	HappyPack可以将Loader的同步执行转换为并行，这样就能充分利用系统资源来加快打包效率了
*/
module: {
	loader: [
		{
			test: /\.js$/,
			include: [
				resolve('src')
			],
			exclude: /node_modules/,
			// id后面的内容对应下面
			loader: 'happypack/loader?id=happybabel'
		}
	]
},
plugin: [
	new HappyPack({
		id: 'happybabel',
		loader: ['babel-loader?cacheDirectory'],
		// 开启四个线程
		threads: 4
	})
],

/*
DllPlugin
	DllPlugin 可以将特定的类库提前打包然后引入
	这种方式可以极大的减少打包类库的次数，只有当类库更新版本才有需要重新打包，
	并且也实现了将公共代码抽离成单独文件的优化方案
*/
// webpack.dll.conf.js
const path = require('path')
const webpack = require('webpack')
module.exports = {
	entry: {
		// 想统一打包的类库
		vendor: ['react']
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].dll.js',
		library: '[name]-[hash]'
	},
	plugins: [
		new webpack.DllPlugin({
			// name必须和output.library一致
			name: '[name]-[hash]',
			// 该属性需要与DllReferencePlugin中一致
			context: __dirname,
			path: path.join(__dirname, 'dist', '[name]-manifest.json')
		})
	]
}
// 需要使用 DllReferencePlugin 将依赖文件引入项目中
// webpack.conf.js 
module.exports = {
	// ...
	plugins: [
		new webpack.DllReferencePlugin({
			context: __dirname,
			// manifest 就是之前打包出来的json文件
			manifest: require('./dist/vendor-manifest.json')
		})
	]
}

/*
代码压缩
	UglifyJS 单线程运行
	webpack-parallel-uglify-plugin来并行运行UgligyJS
	在Webpack4中 只需将mode设置为production
	
	resolve.extensions：用来表明文件后缀列表，默认查找顺序是 ['.js', '.json']，如果你的导入文件没有添加后缀就会按照这个顺序查找文件。我们应该尽可能减少后缀列表长度，然后将出现频率高的后缀排在前面
	resolve.alias：可以通过别名的方式来映射一个路径，能让 Webpack 更快找到路径
	module.noParse：如果你确定一个文件下没有其他依赖，就可以使用该属性让 Webpack 不扫描该文件，这种方式对于大型的类库很有帮助
*/

/*
减少WebPack打包后的文件体积
	按需加载
	Scope Hoisting
		Scope Hoisting会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去
*	Tree Shaking
* 		Tree Shaking 可以实现删除项目中未被引用的代码
* /
