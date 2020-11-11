"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var instance = axios_1["default"].create();
instance.interceptors.request.use(function (config) {
    if (config.url.indexOf('http') == -1) {
        config.url = 'http://localhost:3000' + config.url;
    }
    return config;
});
instance.interceptors.response.use(function (response) {
    if (response.status != 200) {
        return Promise.reject(response);
    }
    return response.data;
});
instance({
    url: '/api/users'
}).then(function (result) {
    console.log(result);
});
