const mockjs = require("mockjs");
module.exports = () => {
    return mockjs.mock({
        status: 0,
        msg: "success",
        "data|6": [
            {
                "id|+1": 1,
                title: "订单 ",
                author: "订单",
                age: 8,
                classify: "python",
                logo_thumb:
                    "http://localhost:8000/uploads/16c574ec-4717-4622-a123-e6475bd8a54a.png",
                logo:
                    "http://localhost:8000/uploads/d5e41a61-cc73-4625-9a1d-369bcd7c8784.png"
            }
        ]
    });
};
