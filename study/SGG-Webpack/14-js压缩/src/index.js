// import '@babel/polyfill'  // 体积太大

const add = (x,y) => {
	return x+y
}

// 下一行eslint所有规则失效(下一行不进行eslint检查)  注意写法
// eslint-disable-next-line


const p = new Promise(res => {
	setTimeout(() => {
		console.log('time')
		res()
	}, 1000)
})

console.log(p)

console.log(add(2,5))