/**
 * cloned from https://github.com/lvming6816077/H5lock
 * modified by jsongo (jsongo@qq.com)
 * this.pswObj:{ step:1,spassword:[] } step:2 手势密码没有过期，输入即可解锁
 */
var app = getApp();

function getDis(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

module.exports = class {
    constructor(page, opt) { // opt 字段有：width, height, 分别代表canvas的宽高，px为单位，
                             // chooseType 手势锁每行的点数，比如3，表示这是一个3 x 3的锁
                             // id: canvas id, default is 'canvasLock'
        this.page = page;
        this.width = opt && opt.width || 300;
        this.height = opt && opt.height || 300;
        this.canvasId = opt && opt.id || 'canvasLock';

        var chooseType = opt && opt.chooseType || 3;
        this.chooseType = Number(wx.getStorageSync('chooseType')) || chooseType;

        this.init();
    }
    init() {
        this.pswObj = wx.getStorageSync('passwordxx') ? {
            step: 2,
            spassword: JSON.parse(wx.getStorageSync('passwordxx'))
        } : {};
        console.log(this.pswObj,"this.pswObj")
        this.lastPoint = [];
        this.makeState();
        this.touchFlag = false;
        this.ctx = wx.createContext();
        // this.actions = [];
        this.createCircle();
        this.bindEvent();
    }

    makeState() {
        if (this.pswObj.step == 2) {
            app.trigger('titleChanged', 'login');
        } else if (this.pswObj.step == 1) {
            // pass
        } else {
            // pass
        }
    }
    updateCanvas() {
        // var newActions = this.ctx.getActions();
        // for (var action of newActions) {
        //     this.actions.push(action);
        // }
        wx.drawCanvas({
            canvasId: this.canvasId,
            actions: this.ctx.getActions(),
            reserve: true
        });
    }
    createCircle() {// 创建解锁点的坐标，根据canvas的大小来平均分配半径
        var n = this.chooseType;
        var count = 0;
        this.r = this.width / (4 * n) - 4;// 公式计算
        this.lastPoint = [];
        this.arr = [];
        this.restPoint = [];
        var r = this.r;
        for (var i = 0 ; i < n ; i++) {
            for (var j = 0 ; j < n ; j++) {
                count++;
                var obj = {
                    x: (2*j+1) * 2 * r,
                    y: (2*i+1) * 2 * r,
                    index: count
                };
                this.arr.push(obj);
                this.restPoint.push(obj);
            }
        }
        this.ctx.clearRect(0, 0, this.width, this.height);
        // this.actions = []; // 清空
        for (var i = 0 ; i < this.arr.length ; i++) {
            this.drawCle(this.arr[i].x, this.arr[i].y);
        }
        this.updateCanvas();
    }
    drawCle(x, y) { // 初始化解锁密码面板
        this.ctx.setStrokeStyle('#09bb07'); // 注意用set
        this.ctx.setLineWidth(2); // 注意用set
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.stroke();

        // this.updateCanvas();
    }
    bindEvent() {
        var self = this;
        this.page.onTouchstart = function (e) {
            var po = self.getPosition(e);
            for (var i = 0 ; i < self.arr.length ; i++) {
                if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {

                    self.touchFlag = true;
                    self.drawPoint(self.arr[i].x,self.arr[i].y);
                    self.lastPoint.push(self.arr[i]);
                    self.restPoint.splice(i,1);
                    break;
                }
            }

            self.touchFlag && self.updateCanvas();
        };
        this.page.onTouchmove = function (e) {
            if (self.touchFlag) {
                self.update(self.getPosition(e));
            }
        };
        this.page.onTouchend = function (e) {
            if (self.touchFlag) {
                self.touchFlag = false;
                self.storePass(self.lastPoint);
                setTimeout(function(){
                    self.reset();
                }, 300);
            }
        };
    }
    getPosition(e) { // 获取touch点相对于canvas的坐标
        var po = {
            x: e.touches[0].x,
            y: e.touches[0].y
        };
        return po;
    }
    update(po) {// 核心变换方法在touchmove时候调用
        this.ctx.clearRect(0, 0, this.width, this.height);
        // this.actions = [];

        for (var i = 0 ; i < this.arr.length ; i++) { // 每帧先把面板画出来
            this.drawCle(this.arr[i].x, this.arr[i].y);
        }

        this.drawPoint(this.lastPoint);// 每帧花轨迹
        this.drawLine(po , this.lastPoint);// 每帧画圆心

        for (var i = 0 ; i < this.restPoint.length ; i++) {
            var pt = this.restPoint[i];

            if (Math.abs(po.x - pt.x) < this.r && Math.abs(po.y - pt.y) < this.r) {
                this.drawPoint(pt.x, pt.y);
                this.pickPoints(this.lastPoint[this.lastPoint.length - 1], pt);
                break;
            }
        }
        this.updateCanvas();
    }
    drawPoint() { // 初始化圆心
        for (var i = 0 ; i < this.lastPoint.length ; i++) {
            this.ctx.setFillStyle('#CFE6FF'); // 注意用set方法
            this.ctx.beginPath();
            this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.fill();
        }

        // this.updateCanvas();
    }
    drawLine(po, lastPoint) {// 解锁轨迹
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);
        console.log(this.lastPoint.length);
        for (var i = 1 ; i < this.lastPoint.length ; i++) {
            this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
        }
        this.ctx.lineTo(po.x, po.y);
        this.ctx.stroke();
        this.ctx.closePath();

        // this.updateCanvas();
    }

    pickPoints(fromPt, toPt) {
        var lineLength = getDis(fromPt, toPt);
        var dir = toPt.index > fromPt.index ? 1 : -1;

        var len = this.restPoint.length;
        var i = dir === 1 ? 0 : (len - 1);
        var limit = dir === 1 ? len : -1;

        while (i !== limit) {
            var pt = this.restPoint[i];

            if (getDis(pt, fromPt) + getDis(pt, toPt) === lineLength) {
                this.drawPoint(pt.x, pt.y);
                this.lastPoint.push(pt);
                this.restPoint.splice(i, 1);
                if (limit > 0) {
                    i--;
                    limit--;
                }
            }

            i+=dir;
        }
        this.updateCanvas();
    }
    
    storePass(psw) {// touchend结束之后对密码和状态的处理
        if (this.pswObj.step == 1) {
            if (this.checkPass(this.pswObj.fpassword, psw)) {
                this.pswObj.step = 2;
                this.pswObj.spassword = psw;
                console.log(psw)
                app.trigger('titleChanged', 'save');
                this.drawStatusPoint('#2CFF26');
                wx.setStorageSync('passwordxx', JSON.stringify(this.pswObj.spassword));
                wx.setStorageSync('chooseType', this.chooseType);
            } else {
                app.trigger('titleChanged', 'mistake');
                this.drawStatusPoint('red');
                delete this.pswObj.step;
            }
            this.updateCanvas();
        } else if (this.pswObj.step == 2) {
            if (this.checkPass(this.pswObj.spassword, psw)) {
                app.trigger('titleChanged', 'ok');
                this.drawStatusPoint('#2CFF26');
            } else {
                this.drawStatusPoint('red');
                app.trigger('titleChanged', 'error');
            }
            this.updateCanvas();
        } else {
            this.pswObj.step = 1;
            this.pswObj.fpassword = psw;
            app.trigger('titleChanged', 'next');
        }
    }
    checkPass(psw1, psw2) {// 检测密码
        var p1 = '',
            p2 = '';
        for (var i = 0 ; i < psw1.length ; i++) {
            p1 += psw1[i].index + psw1[i].index;
        }
        for (var i = 0 ; i < psw2.length ; i++) {
            p2 += psw2[i].index + psw2[i].index;
        }
        return p1 === p2;
    }
    drawStatusPoint(type) { // 初始化状态线条
        for (var i = 0 ; i < this.lastPoint.length ; i++) {
            this.ctx.strokeStyle = type;
            this.ctx.beginPath();
            this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        this.updateCanvas();
    }

    updatePassword() {
        wx.removeStorageSync('passwordxx');
        wx.removeStorageSync('chooseType');
        this.pswObj = {};
        app.trigger('titleChanged', 'set');
        this.reset();
    }
    reset() {
        this.makeState();
        this.createCircle();
        this.updateCanvas();
    }
}