let arrOfNumbers: number[] = [1,2,3] //注意是数字类型的数组
arrOfNumbers.push(3)

function test() {
	console.log(arguments) //类数组
	// let arr: any[] = arguments; //error
	
	// let htmlCollection: HTMLCollection
	
}

//元组
let user: [string,number] = ['khan',20]
user.push('123'); //不能是其他类型
