
function shallowReadonly() {
	return new Proxy(obj, {
		get(obj, key) {
			return obj[key]
		},
		set(obj, key, value) {
			console.warn(`${key}只读 不能赋值`)
		}
	})
}

let obj = {
	a: 'a',
	gf: {
		b: 'b',
		f: {
			c: 'c',
			s: {
				d: 'd'
			}
		}
	}
}

let state = shallowReadonly(obj)

state.a = 10
state.gf.b = 100
