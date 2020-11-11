
// function add(x: number, y: number,z?: number): number { //数字类型
// 	// return x + y;
// 	if(typeof z === 'number') {
// 		return x+y+z;
// 	}else {
// 		return x+y;
// 	}
// }
// let result = add(1,2); 


const add = (x: number, y: number,z?: number): number => { //数字类型
	// return x + y;
	if(typeof z === 'number') {
		return x+y+z;
	}else {
		return x+y;
	}
}

// let add: (x: number,y:number,z?:number) => number = add;

interface ISum {
	(x: number,y:number,z?:number): number
}
let add: ISum = add;