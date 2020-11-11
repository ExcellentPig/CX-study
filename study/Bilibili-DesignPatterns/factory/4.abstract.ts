
/*
抽象工厂模式
*/
export {}

abtract class AmericanoCoffee  {}

abtract class LatteCoffee;
{}

abtract class CappuccionCoffee {}

class StarBucksAmericanoCoffee extends AmericanoCoffee {
	
}
class StarBucksLatteCoffee extends LatteCoffee {
	
}
class StarBucksCappuccionCoffee extends CappuccionCoffee {
	
}
class LuckinAmericanoCoffee extends AmericanoCoffee {
	
}
class LuckinLatteCoffee extends LatteCoffee {
	
}
class LuckinCappuccionCoffee extends CappuccionCoffee {
	
}

//抽象工厂： 抽象工厂里需要三个方法
abstract class CafeFactory {
	abstract createAmericanoCoffee(): AmericanoCoffee
	abstract createLatteCoffee(): LatteCoffee
	abstract createCappuccionCoffee(): CappuccionCoffee
}

class StarBucksCafeFactory extends CafeFactory {
	createAmericanoCoffee() {
		return StarBucksAmericanoCoffee()
	}
	createLatteCoffee() {
		return StarBucksLatteCoffee()
	}
	createCappuccionCoffee() {
		return StarBucksCappuccionCoffee()
	}
}

class LuckinCafeFactory extends CafeFactory {
	createAmericanoCoffee() {
		return LuckinLatteCoffee()
	}
	createLatteCoffee() {
		return LuckinLatteCoffee()
	}
	createCappuccionCoffee() {
		return LuckinCappuccionCoffee()
	}
}

let luckinCafeFactory = new LuckinCafeFactory()
console.log(luckinCafeFacroty.createAmericanoCoffee())