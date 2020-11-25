
jest.mock('./mock')  // 回去__mocks__里面查找
import { fetchData } from './mock'
// import Axios from 'axios'
// jest.mock('axios')

const { getNumber } = jest.requireActual('./mock')

// jest.unmock('./mock')  // 取消mock



test('fetchData',() => {
	// Axios.get.mockResolvedValue({
	// 	data: "(function(){return '123'})()"
	// })
	return fetchData().then(data => {
		expect(eval(data)).toEqual('123')
	})
})

test('getNumber',() => {
	expect(getNumber()).toEqual('123')
})