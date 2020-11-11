/*
开放封装原则，对修改关闭，对扩展开放
*/
export {}

class Customer {
	constructor(public rank: string, discount: number) {
		
	}
}

class Product {
	constructor(public name: string, public price: number) {
	    
	}
	const(customer: Customer) {
		return this.price * customer.discount
	}
}

let product = new Product('笔记本电脑',1000);