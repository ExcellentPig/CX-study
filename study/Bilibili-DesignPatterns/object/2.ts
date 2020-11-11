//继承
export {};//处理重名
class Animal {
	name: string;
	eat() {
		console.log('吃东西')
	}
}

let animal = new Animal()
animal.eat()

class Dog extends Animal {
	
}
let dog = new Dog()
dog.name 
dog.eat