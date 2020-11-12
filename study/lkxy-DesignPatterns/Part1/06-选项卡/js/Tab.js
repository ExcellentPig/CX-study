function TabsFn () {
	this.lis = $('tab_header').getElementsByTagName('li')
	this.contents = $('tab_content').getElementsByClassName('dom');
}

TabsFn.prototype = {
	init: function () {
		this.setId()
		this.bindEvent()
	},
	setId: function () { //设置索引
		for (var i=0;i<this.lis.length;i++) {
			this.lis[i].id = i
		}
	},
	bindEvent: function () { // 绑定事件
		var self = this
		for (var i = 0; i < this.lis.length; i++) {
		    this.lis[i].onmouseover = function () {
		        // 2.1 所有的都不被选中
		        for(var j=0; j<self.lis.length; j++){
		            self.lis[j].className = '';
		            self.contents[j].style.display = 'none';
		        }
		        // 2.2 当前的li被选中
		        this.className = 'selected';
		        self.contents[this.id].style.display = 'block';
		    }
		}
	}
}