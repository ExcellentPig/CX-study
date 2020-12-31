/**
 * 装饰器|装饰者模式：不改变原对象的基础上，通过对其进行包装拓展，使原有对象可以满足用户的更复杂需求
 */


/**
 * 为了不被已有的业务逻辑干扰，当务之急就是将旧逻辑与新逻辑分离
 * 把旧逻辑抽出去
 */
// 将展示Modal的逻辑单独封装
function openModal () {
	const modal = new Modal()
	modal.style.display = 'block'
}
// 编写新逻辑
// 按钮文案修改逻辑
function changeButtonText () {
	const btn = document.getElementById('open')
	btn.innerHTML = '快去登录'
}
// 按钮置灰逻辑
function disableButton () {
	const btn = document.getElementById('open')
	btn.setAttribute('disabled', true)
}
// 新版本功能逻辑整合
function changeButtonStatus () {
	changeButtonText()
	disableButton()
}
// 单后将三个操作逐步添加到open按钮的监听事件里
document.getElementById('open').addEventListener('click', function() {
	openModal()
	changeButtonStatus()
})

// 以上在ES6中可以改写为更加面向对象的方式去写
// 定义打开按钮
class OpenButton {
	onClick () {
		const modal = new Modal()
		modal.style.display = 'block'
	}
}
// 定义按钮对应的装饰器
class Decorator {
	// 将按钮实例传入
	constructor (open_button) {
		this.open_button = open_button
	}
	onClick () {
		this.open_button.onClick()
		// 包装了一层新逻辑
		this.changeButtonStatus()
	}
	changeButtonStatus () {
		this.changeButtonText()
		this.disableButton()
	}
	disableButton () {
		const btn = document.getElementById('open')
		btn.setAttribute('disabled', true)
	}
	changeButtonText () {
		const btn = document.getElementById('open')
		btn.innerHTML = '快去登录'
	}
}
const openButton = new OpenButton()
const decorator = new Decorator()
document.getElementById('open').addEventListener('click', function () {
	// openButton.onClick()
	// 此处可以分别尝试两个实例的onClick方法，验证装饰器是否生效
	decorator.onClick()
})

/**
 * 将不同职责分离，可以做到每个职责能被灵活地复用；
 * 同时不同职责之间无法相互干扰
 */


// ES7 中的装饰器
// 通过 @ 语法糖给一个类装上装饰器

//装饰器封装函数，它的第一个参数是目标类
function classDecorator(target) {
	target.hasDecorator = true
	return target
}
// 将装饰器安装到button类上
@classDecorator
class Button {
	// Button 类的相关逻辑
}
// 验证装饰器是否生效
console.log('Button是否被封装了', Button.hasDecorator)

// 也可以使用同样的语法糖去装饰类里面的方法
function funcDecorator (target, name, descriptor) {
	let originalMethod = descriptor.value
	descriptor.value = function () {
		console.log('我是Func里的装饰器逻辑')
		return originalMethod.apply(this, arguments)
	}
	return descriptor
}
class Button {
	@funcDecorator
	onClick () {
		console.log('我是Func里原有逻辑')
	}
}
// 验证装饰器是否生效
const button = new Button()
button.onClick()