// 实现一个简易版的Promise

// 三个状态
const PENDING = 'penging'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
function MyPromise (fn) {
	const that = this // 获取正确的this对象
	that.state = PENDING // 一开始的状态应该为pending
	that.value = null // value保存resolve或者reject中传入的值
	that.resolvedCallbacks = [] // 这两个数组保存then中的回调
	that.rejectedCallbacks = []
	function resolve (value) {
		if (that.state === PENDING) {
			that.state = RESOLVED
			that.value = value
			that.resolvedCallbacks.map(cb => cb(that.value))
		}
	}
	function reject(value) {
		if (that.state === PENDING) {
			that.state = REJECTED
			that.value = value
			that.rejectedCallbacks.map(cb => cb(that.value))
		}
	}
	try{
		fn(resolve, reject)
	}catch(e){
		reject(e)
	}
}
// then函数
MyPromise.prototype.then = function (onFulfilled, onRejected) {
	const that = this
	onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v,
	onRejected = typeof onRejected === 'function' ?
					onRejected
					: r => {
						throw r
					}
	if (that.state === PENDING) {
		that.resolvedCallbacks.push(onFulfilled)
		this.rejectedCallbacks.push(onRejected)
	}
	if (that.state === RESOLVED) {
		onFulfilled(that.value)
	}
	if (that.state === REJECTED) {
		onRejected(that.value)
	}
}
// 该代码目前在简单版中会报错
// 只是作为一个透传的例子
Promise.resolve(4).then().then((value) => console.log(value))

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 0)
}).then(value => {
  console.log(value)
})

// 实现符合Promise/A+ 规范的Promise
function resolve (value) {
	if (value instanceof MyPromise) {
		return value.then(resolve, reject)
	}
	setTimeout(() => {
		if (that.state === PENDING) {
			that.state = RESOLVED
			that.value = value
			that.resolvedCallbacks.map(cb => cb(that.value))
		}
	}, 0)
}
function reject (value) {
	setTimeout(() => {
		if (that.state === PENDING) {
			that.state = REJECTED
			that.value = value
			that.rejectedCallbacks.map(cb => cb(that.value))
		}
	}, 0)
}
if (that.state === PENDING) {
	return (promise2 = new MyPromise((resolve, reject) => {
	that.resolvedCallbacks.push(() => {
	  try {
		const x = onFulfilled(that.value)
		resolutionProcedure(promise2, x, resolve, reject)
	  } catch (r) {
		reject(r)
	  }
	})

	that.rejectedCallbacks.push(() => {
	  try {
		const x = onRejected(that.value)
		resolutionProcedure(promise2, x, resolve, reject)
	  } catch (r) {
		reject(r)
	  }
	})
}))
if (that.state === RESOLVED) {
  return (promise2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      try {
        const x = onFulfilled(that.value)
        resolutionProcedure(promise2, x, resolve, reject)
      } catch (reason) {
        reject(reason)
      }
    })
  }))
}
function resolutionProcedure(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Error'))
  }
}
let p = new MyPromise((resolve, reject) => {
  resolve(1)
})
let p1 = p.then(value => {
  return p1
})
if (x instanceof MyPromise) {
    x.then(function(value) {
        resolutionProcedure(promise2, value, resolve, reject)
    }, reject)
}
let called = false
if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
  try {
    let then = x.then
    if (typeof then === 'function') {
      then.call(
        x,
        y => {
          if (called) return
          called = true
          resolutionProcedure(promise2, y, resolve, reject)
        },
        e => {
          if (called) return
          called = true
          reject(e)
        }
      )
    } else {
      resolve(x)
    }
  } catch (e) {
    if (called) return
    called = true
    reject(e)
  }
} else {
  resolve(x)
}