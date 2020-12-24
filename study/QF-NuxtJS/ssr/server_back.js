const Vue = require('vue')

// 1 创建一个Vue实例
const app = new Vue({
	template: `<div>hello nuxt</div>`
})

// 2 创建一个renderer
const renderer = require('vue-server-renderer').createRenderer();

// 3 将Vue实例渲染为HTML
// renderer.renderToString(vue实例, (err, 渲染后的html)=>{})

// renderer.renderToString(app, (err, html) => {
// 	if (err) throw err;
// 	console.log(html)
// })

// 在2.5.0+ 如果没有传入回调函数，则会返回Promise
renderer.renderToString(app).then(html => {
	console.log(html)
}).catch(e => {
	console.log(e)
})