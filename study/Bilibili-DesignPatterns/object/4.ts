export {}

//抽象类
abstract class Animal {
	abstract spack(): void
}

class Dog extends Animal {
	// speak() {
	// 	console.log('ww')
	// }
	spack():void {
		console.log('www')
	}
}

class Cat extends Animal {
	spack():void {
		console.log('www')
	}
}

function talk(animal: Animal) {
	animal: speak()
}

talk(new Dog())
talk(new Cat())