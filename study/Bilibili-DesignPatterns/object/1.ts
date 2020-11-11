/*
面向对象的四个特性：
	1、抽象
*/

interface IStorage {
	save(key: string,value: any):void;
	read(key:string): any;
}

class UserInfo {
	public name: string
	constructor(name: string,public storage: IStorage) {
		this.name = name
	}
	save() {
		this.storage.save('userInfo',JSON.stringify(this))
	}
	read() {
		return this.storage.read('userInfo')
	}
}

class localStorage1 implements IStorage {
	save(key: string,value: any): void {
		localStorage.setItem(key,value)
	}
	read(key: string) {
		return localStorage.getItem(key);
	}
}
let local = new localStorage1();

let userInfo = new UserInfo('zs',local)
console.log(userInfo.name)