/*
工厂方法
	就是把创建产品的工作交给由具体工厂类来实现
*/

export {}
abstract class Coffee {
	constructor(public name:string) {
		
	}
}

class AmericanoCoffee extends Coffee {}

class LatteCoffee extends Coffee {}

class CappuccionCoffee extends Coffee {}

abstract class cafeFactory {
	abstract createCoffee():Coffee;
}

class AmericanoCoffee extends CateFactory {
	createCoffee() {
		return new AmericanoCoffee('美式咖啡')
	}
}

class LatteCoffee extends CateFactory {
	createCoffee() {
		return new LatteCoffee('拿铁咖啡')
	}
}

class CappuccionCoffee extends CateFactory {
	createCoffee() {
		return new CappuccionCoffee('卡布奇诺咖啡')
	}
}

let AmericanoCoffeeFactory = new AmericanoCoffee();
console.log(AmericanoCoffeeFactory.createCoffee());
//....