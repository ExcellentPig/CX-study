import $ from 'jquery'
export function mul(x, y) {
	return x * y
}

export function count (x, y) { // 取出 tree shaking
	return x - y
}