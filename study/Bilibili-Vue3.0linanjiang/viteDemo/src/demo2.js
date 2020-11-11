
function reactive(obj) {
	if(typeof obj === 'object') {
			if(obj instanceof Array){
				//取出数组中的每一个元素 判断每一个元素是否优势一个对象
				// 包装秤proxy
				obj.forEach((item,index)=>{
					if(typeof item === 'object') {
						obj[index] = reactive(item);
					}
				})
			}else{
				// 是对象 去出对象属性的取值
				//判断对象属性的取值是否又是一个对象
				// 包装秤proxy
				for(let key in obj) {
					let item = obj[key];
					if(typeof item === 'object') {
						obj[key] = reactive(item);
					}
				}
			}
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
	}else {
		console.warn(`不是object`)
	}
}

function ref(val) {
	return reactive({value: val})
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

let arr = [{
	id:1,
	name: 'zs'
},{
	id: 2,
	name: 'ls'
}]

// let state = reactive(obj)
// state.a = 1;
// state.gf.b = 2

let state = reactive(arr)
state[0].id =10