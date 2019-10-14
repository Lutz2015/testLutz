const mockjs = require("mockjs");
module.exports = options => {
    const page = options.page;
    const img = `http://cdn.singera.cn/www.singera.cn/uploads/01cd0375-55e9-4e7c-be19-2cd8a51a232d-${page}.jpg`;
    return mockjs.mock({
        status: 0,
        msg: "success",
        data: [
            "http://cdn.singera.cn/www.singera.cn/uploads/01cd0375-55e9-4e7c-be19-2cd8a51a232d-0.jpg",
            "http://cdn.singera.cn/www.singera.cn/uploads/01cd0375-55e9-4e7c-be19-2cd8a51a232d-1.jpg",
            "http://cdn.singera.cn/www.singera.cn/uploads/01cd0375-55e9-4e7c-be19-2cd8a51a232d-2.jpg",
            "http://cdn.singera.cn/www.singera.cn/uploads/01cd0375-55e9-4e7c-be19-2cd8a51a232d-3.jpg",
            "http://cdn.singera.cn/www.singera.cn/uploads/01cd0375-55e9-4e7c-be19-2cd8a51a232d-4.jpg",
            "http://cdn.singera.cn/www.singera.cn/uploads/01cd0375-55e9-4e7c-be19-2cd8a51a232d-5.jpg",
            "http://cdn.singera.cn/www.singera.cn/uploads/01cd0375-55e9-4e7c-be19-2cd8a51a232d-6.jpg",
            "http://cdn.singera.cn/www.singera.cn/uploads/01cd0375-55e9-4e7c-be19-2cd8a51a232d-7.jpg",
            "http://cdn.singera.cn/www.singera.cn/uploads/01cd0375-55e9-4e7c-be19-2cd8a51a232d-8.jpg",
            "http://cdn.singera.cn/www.singera.cn/uploads/01cd0375-55e9-4e7c-be19-2cd8a51a232d-9.jpg",
            "http://cdn.singera.cn/www.singera.cn/uploads/01cd0375-55e9-4e7c-be19-2cd8a51a232d-10.jpg",
            "http://cdn.singera.cn/www.singera.cn/uploads/01cd0375-55e9-4e7c-be19-2cd8a51a232d-11.jpg",
            "http://cdn.singera.cn/www.singera.cn/uploads/01cd0375-55e9-4e7c-be19-2cd8a51a232d-12.jpg",
            "http://cdn.singera.cn/www.singera.cn/uploads/01cd0375-55e9-4e7c-be19-2cd8a51a232d-13.jpg"
        ]
    });
};
