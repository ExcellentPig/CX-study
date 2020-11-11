import axios from 'axios'

let instance = axios.create()

instance.interceptors.request.use(config=>{
	if(config.url!.indexOf('http') == -1) {
		config.url = 'http://localhost:3000'+config.url;
	}
	return config
})


instance.interceptors.response.use(response=>{
	if(response.status!=200) {
		return Promise.reject(response)
	}
	return response.data
})

instance({
	url: '/api/users'
}).then(result=>{
	console.log(result)
})