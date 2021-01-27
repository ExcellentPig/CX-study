let timer = null
let timer1 = null
export function msetTimeOut (fn, delay) {
	console.log('set start',timer)
	timer = setTimeout(fn , delay)
	console.log('set end',timer)
}

export function mclearTimeOut () {
	console.log('clear start',timer)
	clearTimeout(timer)
	timer = null
	console.log('clear end',timer)
}

export function  msetInterval (fn, delay) {
	console.log('set start',timer1)
	timer1 = setInterval(fn, delay)
	console.log('set end',timer1)
}

export function mclearInterval () {
	console.log('clear start',timer1)
	clearInterval(timer1)
	timer1 = null
	console.log('clear end',timer1)
}
	
