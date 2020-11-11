/*
依赖倒置原则
	依赖抽象，而非依赖依赖具体的实现
*/

interface Girlfriend {
	age: number;
	height: number;
	cook(): void
}

class LinkChiling implements Girlfriend {
	age: number = 35;
	height: number = 175;
	cook() {
		console.log('can cookie');
	}
}

class Hanmeimei implements Girlfriend {
	age: number = 25;
	height: number = 150;
	cook() {
		console.log('can not cookie');
	}
}

class SingleDog {
	girlfriend: Girlfriend
}

let dog1 = new SingleDog(new LinkChiling())
let dog2 = new SingleDog(new Hanmeimei())