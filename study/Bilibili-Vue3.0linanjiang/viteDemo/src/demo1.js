function shallowReactive(obj) {
	return new Proxy(obj, {
		get(obj, key) {
			return obj[key]
		},
		set(obj, key, value) {
			obj[key] = value
			console.log('更新UI界面')
			return true
		}
	})
}

function shallowRef(val) {
	return shallowReactive({
		value: val
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

// let state = shallowReactive(obj)

// state.a = '1'
// state.gf.b = '2'
// state.gf.f.c = '3'
// state.gf.f.s.d = '4'


let state = shallowRef(obj)
// state.value.a = '1'
// state.value.gf.b = '2'

state.value = {
	a: 'aa',
	gf: {
		b: 'bb',
		f: {
			c: 'cc',
			s: {
				d: 'dd'
			}
		}
	}
}
