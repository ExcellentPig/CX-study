/**
 * 适配器模式通过把一个类的接口变换成客户端所期待的另一种接口，可以帮我们解决不兼容的问题
 */

// 基于fetch的http方法库
export default class HttpUtils {
	// get 方法
	static get(url) {
		return new Promise((resolve, reject) => {
			// 调用fetch
			fetch(url)
				.then(response => response.json()) // fetch第一次拿不到数据
				.then(result => {
					resolve(result)
				})
				.cathch(error => {
					reject(error)
				})
		})
	}
	// post方法， data以object形式传入
	static post(url, data) {
		return new Promise((resolve, reject) => {
			// 调用fetch
			fetch(url, {
				method: 'POST',
				headers: {
					Accept: 'applcation/json',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				// 将object类型的数据格式化为合法的body参数
				body: this.changeData(data)
			})
				.then(response => response.json())
				.then(result => {
					resolve(result)
				})
				.catch(error => {
					rehect(error)
				})
		})
	}
	// body 请求体的格式化方法
	static changeData(obj) {
		var prop, str = ''
		var i = 0
		for (prop in obj) {
			if (!prop) {
				return
			}
			if (i == 0) {
				str += prop + '=' + obj[prop]
			} else {
				str += '&' + prop + '=' + obj[prop]
			}
			i++
		}
		return str
	}
}

//一次适配

// Ajax适配器函数，入参与旧接口保持一致
async function AjaxAdapter (type, url, data, success, failed) {
	const type = type.toUpperCase()
	let result
	try {
		// 实际的请求全部由新接口发起
		if (type === 'GET') {
			result = await HttpUtils.get(url) || {}
		} else if (type === 'POST') {
			result = await HttpUtils.post(url, data) || {}
		}
		// 假设请求成功对应的状态码是1
		result.statusCode === 1 && success ? success(result) : fauled(result.statusCode)
	} catch(error) {
		// 捕捉网络错误
		if (failed) {
			failed(error.statusCode)
		}
	}
}
// 用适配器适配旧的Ajax方法
async function Ajax (type, url, data, success, failed) {
	await AjaxAdapter(type, url, data, success, failed)
}