//封装
export {}
class Animal {
	public name: string; // 公开属性 所所有都可以访问
	protected age: number; //受保护的属性 可以在本类中和子类中访问 其他不能访问
	private weight: number; // 私有的 只有内部可以使用
	constructor(name:string,age:number,weight:number) {
		this.name = name;
		this.age = age;
		this.weight = weight;
	}
}

class Person extends Animal {
	private balance: number;
	constructor(name:string,age:number,weight:number,balance: number) {
		super(name,age,weight);
		this.balance = balance;
	}
	getName() {
		return this.name;
	}
	getAge() {
		return this.age
	}
	getWeight() { //不能被访问
		return this.weight;
	}
}

let p1 = new Person('zs',10,,100,1000)