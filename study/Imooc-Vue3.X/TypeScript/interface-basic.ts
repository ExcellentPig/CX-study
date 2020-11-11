interface Person {
	readonly id: number; //只读
	name: string;
	age?: number;  // ? 可写可不写
}

let khan: Person = {
	name: 'khan',
	age: 20
}

// khan.id = 9527; //error 