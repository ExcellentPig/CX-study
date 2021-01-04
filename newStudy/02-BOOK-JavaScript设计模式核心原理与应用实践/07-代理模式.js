/**
 * 代理模式；
 * 	  在某些情况下，出于种种考虑/限制，一个对象不能直接访问另一个对象，需要一个第三者(代理)牵线搭桥
 *    从而间接达到访问目的，这样模式就是代理模式
 */

// ES6的Proxy
const proxy = new Proxy(obj, handler)

// 婚介所
const girl = {
	name: 'xm',
	aboutMe: '...',
	age: 24,
	career: 'teacher',
	fakeAvatar: 'xxx',
	avatar: 'xxx',
	phone: 123456
}
// 判断是否是VIP
const baseInfo = ['age', 'career']
const privateInfo = ['avatar', 'phone']
const user = {
	...， // 一些必要信息
	inValidated: true,
	isVIP: false
}
// get拦截
const JueJinLovers = new Proxy(girl, {
	get: function (girl, key) {
		if (baseInfo.indexOf(key) !== -1 && !user.isValidated) {
			alert('你还没有完成验证哦')
			return
		}
		// ...
		// 验证通过的可以购买VIP
		if (user.isValidated && privateInfo.indexOf(key) && !user.isVIP) {
			alert('只有VIP才可以查看该消息')
			return
		}
	}
})
// set拦截
const present = {
	type: 'xxx',
	value: 30
}
const girl = {
	name: 'xm',
	aboutMe: '...',
	age: 24,
	career: 'teacher',
	fakeAvatar: 'xxx',
	avatar: 'xxx',
	phone: 123456,
	presents: [],
	bottomValue: 50,
	lastPresent: present
}
const JueJinLovers = new Proxy(girl, {
	get: function (girl, key) {
		if (baseInfo.indexOf(key) !== -1 && !user.isValidated) {
			alert('你还没有完成验证哦')
			return
		}
		// ...
		// 验证通过的可以购买VIP
		if (user.isValidated && privateInfo.indexOf(key) && !user.isVIP) {
			alert('只有VIP才可以查看该消息')
			return
		}
	}
	set: function (girl, key, value) {
		if (key === 'lastPresent') {
			if (val.value < girl.bottomValue) {
				alert('sorry 你的礼物被拒收了')
			}
		}
		// 没有被拒收
		girl.lastPresent = val
		girl.presents = [...girl.presents, val]
	}
})


// 代理事件
/*

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>事件代理</title>
</head>
<body>
  <div id="father">
    <a href="#">链接1号</a>
    <a href="#">链接2号</a>
    <a href="#">链接3号</a>
    <a href="#">链接4号</a>
    <a href="#">链接5号</a>
    <a href="#">链接6号</a>
  </div>
</body>
</html>

*/
// 1、 不使用代理的情况
const aNodes = document.getElementById('father').getElementsByTagName('a')
const aLength = aNodes.length
for (let i=0;i<aLength;i++) {
	aNodes[i].addEventListener('click', function(e) {
		e.preventDefault()
		alert(`我是${aNodes[i].innerText}`)
	})
}
/*
考虑到事件本身具有“冒泡”的特性，当我们点击 a 元素时，点击事件会“冒泡”到父元素 div 上，
从而被监听到。如此一来，点击事件的监听函数只需要在 div 元素上被绑定一次即可，
而不需要在子元素上被绑定 N 次——这种做法就是事件代理，它可以很大程度上提高我们代码的性能。
*/
// 事件代理的实现
const father = document.getElementById('father')
father.addEventListener('click', function(e) {
	if (e.target.tagName === 'A') {
		e.preventDefault()
		alert(`我是${e.target.innerText}`)
	}
})
/*
在这种做法下，我们的点击操作并不会直接触及目标子元素，
而是由父元素对事件进行处理和分发、间接地将其作用于子元素，因此这种操作从模式上划分属于代理模式
*/

// 虚拟代理
// 图片懒加载
/*
这个 PreLoadImage 乍一看没问题，但其实违反了我们设计原则中的单一职责原则。
PreLoadImage 不仅要负责图片的加载，还要负责 DOM 层面的操作（img 节点的初始化和后续的改变）。
这样一来，就出现了两个可能导致这个类发生变化的原因。
*/
const PreLoadImage {
	static LOADING_URL = 'xxxx'
	constructor (imgNode) {
		this.imgNode = imgNode
	}
	setSrc (targetUrl) {
		this.imgNode.src = PreLoadImage.LOADING_URL
		const image = new Image()
		image.onLoad = () => {
			this.imgNode.src = targetUrl
		}
		image.src = targetUrl
	}
}

/*
好的做法是将两个逻辑分离，
让 PreLoadImage 专心去做 DOM 层面的事情（真实 DOM 节点的获取、img 节点的链接设置），
再找一个对象来专门来帮我们搞加载——这两个对象之间缺个媒婆，这媒婆非代理器不可：
*/
class PreLoadImage {
	constructor (imgNode) {
		this.imgNode = imgNode
	}
	setSrc (imgUrl) {
		this.imgNode.src = imgUrl
	}
}
class ProxyImage {
	static LOADING_URL = 'xxxx'
	constructor (targetImage) {
		this.targetImage = targetImage
	}
	setSrc (targetUrl) {
		this.targetImage.setSrc(ProxyImage.LOADING_URL)
		const virtualImage = new Image()
		virtualImage.onLoad = () => {
			this.targetImage.setSrc(targetUrl)
		}
		virtualImage.src = targetUrl
	}
}

// 缓存代理
/*
缓存代理比较好理解，它应用于一些计算量较大的场景里。
在这种场景下，我们需要“用空间换时间”——当我们需要用到某个已经计算过的值的时候，
不想再耗时进行二次计算，而是希望能从内存里去取出现成的计算结果。
这种场景下，就需要一个代理来帮我们在进行计算的同时，进行计算结果的缓存了。
*/
// 对出入的参数求和
const addAll = function () {
	console.log('进行了一次计算')
	let result = 0
	const len = arguments.length
	for (let i=0;i<len;i++) {
		result += arguments[i]
	}
	return result
}
// 创建求和代理
const proxyAddAll = (function () {
	const resultCache = {}
	return function () {
		const args = Array.prototype.join.call(arguments, ',')
		if (args in resultCache) {
			return resultCache[args]
		}
		return resultCache[args] = addAll(...arguments)
	}
})()