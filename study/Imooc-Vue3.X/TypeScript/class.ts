class Animal {
	readonly name: string; //只读
	constructor(name) {
		this.name = name
	}
	run() {
		return `${this.name} is runnung`
	}
}
const snake = new Animal('lily');
//console.log(snake.run()) // 就不允许访问了 private


class Dog extends Animal {
	bark() {
		return `${this.name} is barking`
	}
}
const xiaobao = new Dog('xiaobao')
console.log(xiaobao.run())