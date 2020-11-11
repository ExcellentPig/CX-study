export default class NewBaoJian {
	person(number) {
		this.user = number == 1 ? 'zs':'ls'
	}
	demo1() {
		this.fuwu = this.user + 'come in '
	}
	demo2() {
		this.fuwu = this.user+ 'comeout'
	}
	demo3() {
		this.fuwu = this.user+'demo3'
	}
	demo4() {
		this.fuwu = this.user+'demo4'
	}
}