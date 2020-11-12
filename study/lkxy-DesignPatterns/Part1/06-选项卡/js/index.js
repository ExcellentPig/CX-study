/*window.onload = function (ev) {
    // 1. 获取需要的标签
    var allLis = $('tab_header').getElementsByTagName('li');
    var allDom = $('tab_content').getElementsByClassName('dom');
    // console.log(allLis, allDom);

    // 2. 遍历监听
    for (var i = 0; i < allLis.length; i++) {
        var li = allLis[i];
        li.id = i;
        li.onmouseover = function () {
            // 2.1 所有的都不被选中
            for(var j=0; j<allLis.length; j++){
                allLis[j].className = '';
                allDom[j].style.display = 'none';
            }
            // 2.2 当前的li被选中
            this.className = 'selected';
            allDom[this.id].style.display = 'block';
        }
    }

};*/

var tab = new TabsFn();
tab.init();

/**
 * 根据id获取标签
 * @param {string}id
 * @returns {object}
 */
function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : null;
}