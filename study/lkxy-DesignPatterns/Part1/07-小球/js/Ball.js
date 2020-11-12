function Ball(options) {
	this._init(options)
}
Ball.prototype = {
	_init: function(options) {
		this.parentId = options.parentId
		this.left = options.left
		this.top = options.top
		this.r = 60
		this.bgColor = options.bgColor || 'red'
		
		this.dX = _.random(-5,5)
		this.dY = _.random(-5,5)
		this.dR = _.random(1,3)
	},
	render: function () {
		var parentNode = document.getElementById(this.parentId)
		var childNode = document.createElement('div')
		parentNode.appendChild(childNode)
		childNode.style.position = 'absolute'
		childNode.style.left = this.left + 'px'
		childNode.style.top = this.top + 'px'
		childNode.style.width = this.r + 'px'
		childNode.style.height = this.r + 'px'
		childNode.style.borderRadius = '50%'
		childNode.style.backgroundColor = this.bgColor
	},
	update: function() {
		this.left += this.dX
		this.top += this.dY
		this.r -= this.dR 
		if (this.r <=0) {
			this.r = 0
			ballArr = _.without(ballArr, this)
		}
	}
}