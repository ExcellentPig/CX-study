// function myToll () {
// 	// 私有数据
// 	var money = 1000
// 	// 提供操作私有数据的函数
// 	function get() {
// 		money *= 10
// 		console.log(`加了${money}元`)
// 	}
// 	function send() {
// 		money --;
// 		console.log(`减了${money}元`)
// 	}
// 	return {
// 		'get': get,
// 		'send': send
// 	}
// }

(function(w) {
	var money = 1000
	// 提供操作私有数据的函数
	function get() {
		money *= 10
		console.log(`加了${money}元`)
	}

	function send() {
		money--;
		console.log(`减了${money}元`)
	}
	w.myTool = {
		'get': get,
		'send': send
	}
})(window)
