const url = require('url')

var api = 'http://www.baidu.com?name=zs&age=20'

// console.log(url.parse(api))

/**
	Url {
	  protocol: 'http:',
	  slashes: true,
	  auth: null,
	  host: 'www.baidu.com',
	  port: null,
	  hostname: 'www.baidu.com',
	  hash: null,
	  search: '?name=zs&age=20',
	  query: 'name=zs&age=20',
	  pathname: '/',
	  path: '/?name=zs&age=20',
	  href: 'http://www.baidu.com/?name=zs&age=20'
	}
 */

//console.log(url.parse(api, true))
//query: [Object: null prototype] { name: 'zs', age: '20' },


var temp = url.parse(api, true).query
console.log(temp)
console.log(`姓名:${temp.name}`)