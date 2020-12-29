const http = require('http')
const tools = require('./module/tool.js')

http.createServer((req, res) => {
	res.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"})
	res.write("<head><meta charset='UTF-8'></head>")
	res.write('nodejs')
	var api = tools.formatApi('/api/cartlist')
	res.write(api)
	res.end()
}).listen(3000)
