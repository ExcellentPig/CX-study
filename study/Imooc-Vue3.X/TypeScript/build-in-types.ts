// global objects
const a: Array<number> = [1,2,3]
const date = new Date()
date.getTime()
const reg = /abc/;
reg.test('abc')


//build-in object
Math.pow(2,2)

//DOM和BOM
let body = document.body 

let allLis = document.querySelectorAll('li')
allLis.keys()

document.addEventListener('click',()=>{
	
})

// Utility Types
interface IPerson {
	name: string
	age: number
}
let khan: IPerson = { name: 'khan', age: 20}
type IPartial = Partial<IPerson>
let khan2: IPartial = { name: 'khan' }
type IOmit = Omit<IPerson,'name'>
let khan3: IOmit = { age: 20 }