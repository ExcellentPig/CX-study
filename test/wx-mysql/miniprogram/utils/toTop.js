export function onPageScroll(e) {
	console.log(e, 1111)
	if (e.scrollTop > 100) {
		this.setData({
			floorstatus: false
		});
	} else {
		this.setData({
			floorstatus: true
		});
	}
}
