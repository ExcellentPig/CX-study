
import count from './count.js'

console.log('load..')

import('./add').then(({ default: add }) => {
	console.log(add(1,2))
 })

console.log(count(2,1))