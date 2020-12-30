// 构造器
const liLei = {
	name: 'lilei',
	age: 25,
	career: 'coder'
}

// 构造函数
function User (name, age, career) {
	this.name = name
	this.age = age
	this.career = career
}
const user = new User(name, age, career)


// 简单工厂模式
function Coder(name, age) {
	this.name = name
	this.age = age
	this.career = 'coder'
	this.work = ['写代码','写系分','修BUG']
}
function ProductManager(name, age) {
	this.name = name
	this.age = age
	this.career = 'product manager'
	this.work = ['定会议室', '写PRD', '催更']
}
// 把变化的交给一个函数去解决
function Factory(name, age, career) {
	switch (career) {
		case 'coder':
			return new Coder(name, age)
			break
		case 'product manager':
			return new ProductManager(name, age)
			break
		// ...
	}
}
// 继续封装完善
function User(name, age, career, work) {
	this.name = name
	this.age = age
	this.career = career
	this.work = work
}
function Factory(name, age, career) {
	let work
	switch(career) {
		case 'code':
			work = ['写代码','写系分','修BUG']
			break
		case 'product manager':
			work = ['定会议室', '写PRD', '催更']
			break
		// ...
	}
	return new User(name, age, career, work)
}

/**
 * 总结：工厂模式就是讲创建对象的过程单独封装
 */

// 抽象工厂模式

// 抽象类约定这台手机的基本组成
class MobilePhoneFactory {
	// 提供操作系统的接口
	createOS() {
		throw new Error(`抽象工厂方法不允许直接调用，你需要将我重写`)
	}
	// 提供硬件的接口
	createHardWare () {
		throw new Error(`抽象工厂方法不允许直接调用，你需要将我重写`)
	}
}
// 具体工厂继承自抽象工厂
class FakeStarFactory extends MobilePhoneFactory {
	createOS() {
		// 提供安卓系统实例
		return new AndoroidOS()
	}
	createHardWare() {
		// 提供高通硬件实例
		return new QualcommHardWare()
	}
}
// 定义操作系统这类产品的抽象产品类
class OS {
	controlHardWare () {
		throw new Error(`抽象产品不允许直接调用，你需要将我重写`)
	}
}
// 定义具体操作系统的具体产品类
class AndoroidOS extends OS {
	controlHardWare() {
		console.log('我会用安卓的方式去操作硬件')
	}
}
class AppleOS extends OS {
	controlHardWare () {
		console.log('我会用苹果的方式去操作硬件')
	}
}
// ...
// 硬件类的产品同理
// 定义手机硬件这类产品的抽象产品类
class HardWare {
	// 手机硬件的共性方法，这里提取了‘根据命令运转’这个共性
	operateByOrder () {
		throw new Error('抽象产品方法不允许直接调用，你需要将我重写')
	}
}
// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
	operateByOrder () {
		console.log('我会用高通的方式去运转')
	}
}
class MiWare extends HardWare {
	operateByOrder () {
		console.log('我会用小米的方式去运转')
	}
}
// 生产一台手机
// 我的手机
const myPhone = new FakeStarFactory()
// 让他拥有操作系统
const myOS = myPhone.createOS()
// 让他拥有硬件
const myHardWare = myPhone.createHardWare()
// 启动操作系统
myOS.controlHardWare()
// 唤醒硬件
myHardWare.operateByOrder()

// 如果需要更换手机 开拓新机 只需要拓展他的种类 这样对原有的系统不会存在任何潜在影响
class newStarFactory extends MobilePhoneFacroty {
	createOS() {
		// 操作系统实现代码
	}
	createHardWare(){
		// 硬件实现代码
	}
}

/**
 * 总结
 * 	1、抽象工厂：抽象类，他不能被用于生产具体实例
 *  2、具体工厂：用于生成产品族里的一个具体产品
 *  3、抽象产品：抽象类，他不能用于生成具体实例
 *  4、具体产品：用于生成产品族里的一个具体的产品所依赖的更细粒度的产品
 */