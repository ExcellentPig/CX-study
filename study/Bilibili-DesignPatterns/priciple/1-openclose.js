"use strict";
exports.__esModule = true;
var Customer = /** @class */ (function () {
    function Customer(rank, discount) {
        this.rank = rank;
    }
    return Customer;
}());
var Product = /** @class */ (function () {
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    Product.prototype["const"] = function (customer) {
        return this.price * customer.discount;
    };
    return Product;
}());
var product = new Product('笔记本电脑', 1000);
