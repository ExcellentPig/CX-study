/*
原型与原型链
	prototype
		1、特点
			1、储存在prototype中的方法可以被对应构造函数创建出来的所有对象共享
			2、prototype中除了可以储存方法外，还可以存储属性
			3、prototype如果出现了和构造函数中同名的属性或者方法，对象在访问的时候，访问到的是构造函数中的数据
		2、应用场景(储存一类对象共性的部分)
			1、prototype中一般情况下用于存储所有对象都相同的一些属性以及方法
			2、如果是对象特有的属性或者方法，我们会存储到构造函数中
*/
function Person (myName, myAge) {
	this.name = myName
	this.age = myAge
	this.currentType = '构造函数中的type'
	this.say = function () {
		console.log('构造函数中的say')
	}
}
Person.prototype = {
	currentType: "人",
	say: function () {
		console.log('hello world')
	}
}

/*
__proto__ 与prototype
	1、prototype：每个“构造函数”中都有一个默认的属性,prototype属性保存着一个对象，称之为原型对象
	2、constructor：每个原型对象中都有一个默认属性constructor，constructor指向当前原型对象对应的那个构造函数
	3、__proto__: 通过构造函数创建出来的对象我们称之为实例对象，每个实例对象都有一个默认的属性叫做__proto__,指向创建他那个构造函数的原型对象
*/

/*
Object
	1、JavaScript中函数是引用类型(对象类型)，所以Function函数也是对象
	2、Function构造函数也是一个对象，所以也有__proto__属性，Function构造函数的__proto__属性指向Function原型对象
	3、JavaScript中还有一个系统提供的构造函数叫做Object,只要函数都是Function构造函数的实例对象
	4、只要是对象就有__proto__属性，所以Object构造函数也有__proto__属性，Object构造函数的__proto__属性指向创建它那个函数的原型对象
	5、只要是构造函数都有一个默认的属性prototype,保存着一个对象，称之为原型对象
	6、只要是原型对象都有一个默认属性叫做constructor，指向当前原型对象对应的那个构造函数
*/

/*
原型链
	1、对象中__proto__组成的链条我们称之为原型链
	2、对象在查找属性和方法的时候，会现在当前对象查找，如果当前对象中找不到想要的，会依次去上一级原型对象中查找
	   如果找到Object原型对象都没有找到，就会报错
*/

/*
1、一般实例对象的__proto__指向其构造函数的原型对象(所以Function的特殊之处在于其自己构造了自己)
2、所有的原型对象的__proto__都指向Object的原型对象(Object.prototype.__proto__指向null)
3、constructor指向其所属对象的所属对象
4、函数都有prototype
5、prototype的constructor要指回prototype的所属函数才完整
*/