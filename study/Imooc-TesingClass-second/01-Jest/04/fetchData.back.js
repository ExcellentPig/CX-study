import { fetchData } from './fetchData.js'

// test('fetchData 返回结果为${ success: true }', (done) => {
// 	fetchData((data) => {
// 		expect(data).toEqual({
// 			success: true
// 		})
// 		done()
// 	})
// })

// test('fetchData 返回结果为${ success: true }', () => {
// 	return fetchData().then(response => {
// 		expect(response.data).toEqual({
// 			success: true
// 		})
// 	})
// })

// test('fetchData 返回结果为 404', () => {
// 	expect.assertions(1)
// 	return fetchData().catch(e => {
// 		console.log(e.toString())
// 		expect(e.toString().indexOf('404') > -1).toBe(true)
// 	})
// })

// test('fetchData 返回结果为 404', () => {
// 	return expect(fetchData()).resolves.toMatchObject({
// 		data: {
// 			success: true
// 		}
// 	})
// })

// test('fetchData 返回结果为 404', () => {
// 	return expect(fetchData()).rejects.toThrow()
// })


// test('fetchData 返回结果为 404', async () => {
// 	await expect(fetchData()).resolves.toMatchObject({
// 		data: {
// 			success: true
// 		}
// 	})
// })

// test('fetchData 返回结果为 404', async () => {
// 	const response = await fetchData()
// 	expect(response.data).toEqual({
// 		success: true
// 	})
// })

test('fetchData 返回结果为 404', async () => {
	expect.assertions(1)
	try {
		await fetchData()
	} catch (e) {
		expect(e.toString()).toEqual('Error: Request failed with status code 404')
		// console.log(e.toString())
	}
})