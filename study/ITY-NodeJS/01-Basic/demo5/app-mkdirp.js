// npm i mkdirp --save

const mkdirp = require('mkdirp')

// mkdirp('./upload').then(res=> {
// 	console.log('success')
// })

mkdirp('./upload/images/icon').then(res=> {
	console.log('success')
})
