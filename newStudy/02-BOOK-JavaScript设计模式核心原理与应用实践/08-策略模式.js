// if-else
function askPrice (tag, originPrice) {
	if (tag === 'pre') {
		if (originPrice >= 100) {
			return originPrice - 20
		}
		return originPrice * 0.9
	}
	if (tag == 'onSale') {
		if (originPrice >= 100) {
			return originPrice - 30
		}
		return originPrice * 0.8
	}
	if (tag === 'back') {
		if (originPrice >= 200) {
			return originPrice - 50
		}
		return originPrice
	}
	if (tag === 'fresh') {
		return originPrice * 0.5
	}
}

// 我们需要封装函数 让一个函数做一件事情 而不是 在向里面写if  else
function prePrice(originPrice) {
	if (originPrice >= 100) {
		return originPrice - 20
	}
	return originPrice * 0.9
}
function onSalePrice (originPrice) {
	if (originPrice >= 100) {
		return originPrice - 30
	}
	return originPrice * 0.8
}
function backPrice (originPrice) {
	if (originPrice >= 200) {
		return originPrice - 50
	}
	return originPrice
}
function freshPrice (originPrice) {
	return originPrice * 0.5
}
function askPrice (tag, originPrice) {
	if (tag === 'pre') {
		return prePrice(originPrice)
	}
	if (tag === 'onSale') {
		return onSalePrice(originPrice)
	}
	if (tag === 'back') {
		return backPrice(originPrice)
	}
	if (tag === 'fresh') {
		return freshPrice(originPrice)
	}
}
// 可以把询价算法全都收敛到一个对象里去
const priceProcessor = {
	pre(originPrice) {
		if (originPrice >= 100) {
			return originPrice - 20
		}
		return originPrice * 0.9
	},
	onSale (originPrice) {
		if (originPrice >= 100) {
			return originPrice - 30
		}
		return originPrice * 0.8
	},
	back(originPrice) {
		if (originPrice >= 200) {
			return originPrice - 50
		}
		return originPrice
	},
	fresh(originPrice) {
		return originPrice * 0.5
	}
}
function askPrice (tag, originPrice) {
	return priceProcessor[tag](originPrice)
}
// 新增关系
priceProcessor.newUser = function (originPrice) {
	if (originPrice >=100) {
		return originPrice - 50
	}
	return originPrice
}

/**
 * 策略模式
 * 	定义一系列的算法，把他们一个个封装起来，并且使他们可相互替换
 */