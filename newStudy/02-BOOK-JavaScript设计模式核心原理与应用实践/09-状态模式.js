// if - else
class CoffeeMaker {
	constructor() {
	    this.state = 'init'
	}
	changeState (state) {
		this.state = state
		if (state === 'american') {
			console.log('我吐黑咖啡')
		} else if (state === 'latte') {
			console.log('我给黑咖啡加点奶')
		} else if (state === 'vanillaLatte') {
			console.log('黑咖啡加点奶再加点香草糖浆')
		} else if (state === 'mocha') {
			console.log('黑咖啡加点奶再加点香草糖浆再加点巧克力')
		}
	}
}
const mk = new CoffeeMaker()
mk.changeState('latte')

// 不使用 if-else 
class CoffeeMaker {
	constructor() {
		this.state = 'init'
	}
	changeState (state) {
		this.state = state
		if (state === 'american') {
			this.americanProcess()
		} else if (state === 'latte') {
			this.latteProcress()
		} else if (state === 'vanillaLatte') {
			this.vanillaLatteProcress()
		} else if (state === 'mocha') {
			this.mochaProcress()
		}
	}
	americanProcess () {
		console.log('我只吐黑咖啡')
	}
	latteProcress () {
		this.americanProcess()
		console.log('加点奶')
	}
	vanillaLatteProcress () {
		this.latteProcress()
		console.log('再加点草糖浆')
	}
	mochaProcress () {
		this.latteProcress()
		console.log('再加巧克力')
	}
}
const mk = new CoffeeMaker()
mk.changeState('latte')

// 开放封闭 进一步优化 干掉if else 
const stateToProcessor = {
	american () {
		console.log('我只吐黑咖啡')
	},
	latte () {
		this.american()
		console.log('加点奶')
	},
	vanillaLatte () {
		this.latte()
		console.log('再加点香草糖浆')
	},
	mocha() {
		this.latte()
		console.log('再加巧克力')
	}
}
class CoffeeMaker {
	constructor() {
	    this.state = 'init'
	}
	changeState (state) {
		this.state = state
		if (!stateToProcessor[state]) {
			return
		}
		stateToProcessor[state]()
	}
}
const mk = new CoffeeMaker()
mk.changeState('latte')

//策略与状态的辨析
//状态-行为映射对象作为主体类对应实例的一个属性添加进去
class CoffeeMaker {
	constructor() {
	    this.state = 'init'
		this.leftMilk = '500ml'
	}
	stateToProcessor = {
		that: this,
		american () {
			console.log('咖啡机现在牛奶存储量是：',this.that.leftMilk)
			console.log('我只吐黑咖啡')
		},
		latte () {
			that.american()
			console.log('加点奶')
		},
		vanillaLatte () {
			this.latte()
			console.log('再加香草糖浆')
		},
		mocha () {
			this.latte()
			console.log('再加巧克力')
		}
	}
	changeState (state) {
		this.state = state
		if (!this.stateToProcessor[state]) {
			return
		}
		this.stateToProcessor[state]()
	}
}
const mk = new CoffeeMaker()
mk.changeState('latte')

/**
 状态模式
	允许一个对象在其内部状态改变时改变他的行为，对象看起来似乎修改了它的类
	状态模式主要解决的问题是当控制一个对象状态的条件表达式过于复杂的情况。把状态的判断逻辑转移到
	表示不同状态的一系列类中，可以把复杂的判断逻辑简化
 */