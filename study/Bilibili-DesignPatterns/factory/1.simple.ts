abstract class Coffee {
	constructor(public name:string) {
		
	}
}

class AmericanoCoffee extends Coffee {

}

class LatteCoffee extends Coffee {

}

class CappuccionCoffee extends Coffee {

}

//简单工厂
class cafeFactory {
	static order(name:string) {
		switch(name) {
			case: 'AmericanoCoffee': 
				return new AmericanoCoffee('美式咖啡')
			case: 'LtteCoffee':
				return new LtteCoffee('拿铁咖啡')
			case: 'CappuccionCoffee':
				return new CappuccionCoffee('卡布奇诺咖啡')
			default:
				throw new Error('不存在')
		}
	}
}

console.log(cafeFactory.order('AmericanoCoffee'))
console.log(cafeFactory.order('LtteCoffee'))
console.log(cafeFactory.order('LtteCoffee'))