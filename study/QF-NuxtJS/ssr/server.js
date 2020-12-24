const Vue = require('vue')
const server = require('express')(); // 引入并调用

// express响应
server.get('/', (req, res) => {
	// 1 创建一个Vue实例
	const app = new Vue({
		template: `<div>${ req.url }</div>`
	})
	// 2 创建一个renderer
	const renderer = require('vue-server-renderer').createRenderer();
	// 在2.5.0+ 如果没有传入回调函数，则会返回Promise
	renderer.renderToString(app).then(html => {
		res.send(`
		 <!DOCTYPE html>
		 <html lang="zh">
		 <head>
		 	<meta charset="UTF-8">
		 	<meta name="viewport" content="width=device-width, initial-scale=1.0">
		 	<meta http-equiv="X-UA-Compatible" content="ie=edge">
		 	<title></title>
		 </head>
		 <body>
		 	${html}
		 </body>
		 </html>
		`)
	}).catch(e => {
		console.log(e)
	})
})

server.listen(3001)
