// 为了兼容之前老的mockData

const path = require("path");

// rest/app/star/account/status
module.exports = function(req, res, next) {
    let mockData;
    // 对路由截断获取 path
    let pathArr = req.originalPath.split("/"); // 数组 ['', 'rest',...]
    let routerPath = pathArr.reduce(function(pre, cur, index) {
        // 截断 /rest/api/star
        if (index > 0) {
            return pre + "/" + cur;
        } else {
            return "";
        }
    });
    let filePath = path.join("../mock/response/", routerPath);

    try {
        delete require.cache[require.resolve(filePath)];
        // 需要执行一下，主要是之前的写法返回的是一个函数，且有个req参数
        mockData = require(filePath);
        // 函数则执行，支持传参数
        if (typeof mockData === "function") {
            mockData = mockData(req);
        }
        res.header("x-api-mock-path", require.resolve(filePath));
        res.send(mockData);
    } catch (err) {
        console.log(err);
        next(err);
    }
};
