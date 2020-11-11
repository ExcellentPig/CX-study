/*
单一职责
	一个类的功能尽可能单一，不要太复杂
	如果一个类代码太多方法太多 就要拆分了
*/

class Product {
	public name: string;
	public price: number;
	public category: Category;
	public updateProductName() {
		
	}
}

class Category {
	public name: string;
	public icon: string;
}