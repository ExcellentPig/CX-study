interface Jquery {
	[index:number]: any
}

class Jquery {
	length: number
	constructor(selector:string) {
		let elements = Array.from(document.querySelectorAll(selector))
		let length - elements ? elements.length:0
		this.length = length
		for(let i=0;i<length;i++) {
			this[i] = elements[i]
		}
	}
	html(htmlText: string|undefined) {
		if(htmlText) {
			for(let i=0;i<this.length;i++) {
				this[i].innerHTML = htmlText
			}
		}else {
			return this[0].innerHTML
		}
	}
}

interface Window {
	$: any
}

//简单工厂就是函数里返回的实例
window.$ = function(selector: string) {
	return new Jquery(selector)
}