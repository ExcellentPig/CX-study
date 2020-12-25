// var http = require('http')
// http.createServer(function(request, response) {
// 	response.writeHead(200, {'Content-Type': 'text/plain'})
// 	response.end('Hello World')
// }).listen(8081)

// console.log('Server running at http://127.0.0.1:8081/')


const http = require('http')
/**
 * req 客户端传过来的信息
   res 给浏览器响应信息
 */
http.createServer((req, res) => {
	console.log(req.url) 
	res.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"})
	res.write('<head><meta charset="utf-8"></head>') // 设置html编码
	res.write('你好 this is nodejs')
	res.write('<h2>你好 h2</h2>')
	res.end(); // 结束响应
}).listen(3000)
