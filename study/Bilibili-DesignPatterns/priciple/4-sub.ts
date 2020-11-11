/*
尽可能使用父类或者抽象类
	任何在能使用父类的地方都要可以使用子类
	多态关系
*/

export {}

abstract class AbstractDrink {
	getPrice():number;
}

class CocaCola extends AbstractDrink {
	getPrice() {
		return 3;
	}
}
class Sprite extends AbstractDrink {
	getPrice() {
		return 4;
	}
}
class Fanta extends AbstractDrink {
	getPrice() {
		return 5;
	}
}

class Customer {
	drink(abstractDrink: AbstractDrink) {
		console.log('花费'+abstractDrink.getPrice());
	}
}

let c1 = new Customer();
c1.drink(new CocaCola());

/*
里氏代换
	可以替换，任何可以传父类的地方，都可以把子类传进去
里氏代换是一个原则
	要求子类不能违反父类的功能和规定
*/