/*
面向对象的四个特性：
    1、抽象
*/
var UserInfo = /** @class */ (function () {
    function UserInfo(name, storage) {
        this.storage = storage;
        this.name = name;
    }
    UserInfo.prototype.save = function () {
        this.storage.save('userInfo', JSON.stringify(this));
    };
    UserInfo.prototype.read = function () {
        return this.storage.read('userInfo');
    };
    return UserInfo;
}());
var localStorage1 = /** @class */ (function () {
    function localStorage1() {
    }
    localStorage1.prototype.save = function (key, value) {
        localStorage.setItem(key, value);
    };
    localStorage1.prototype.read = function (key) {
        return localStorage.getItem(key);
    };
    return localStorage1;
}());
var local = new localStorage1();
var userInfo = new UserInfo('zs', local);
console.log(userInfo.name);
