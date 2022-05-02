"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
axios_1["default"].get("https://cnodejs.org/api/v1/user/alsotang").then(function (response) {
    var datas = response.data.data;
    console.log(datas.loginname.length);
});
