const mockjs = require("mockjs");
module.exports = () => {
    return mockjs.mock({
        status: 0,
        msg: "success",
        data: [
            {
                id: 100007,
                title: "USACO美国计算机信奥赛",
                logo:
                    "http://cdn.singera.cn/www.singera.cn/uploads/ff9c0ed9-0463-45ab-af9b-097ae624f215.png",
                desp:
                    "USACO（美国信息学奥林匹克竞赛）初次举办于1992年，其官网是一个美国著名的在线题库，更是美国中学生的官方竞赛网站，开设目的是为每年夏季举办的国际信息学奥林匹克竞赛（IOI）选拔队员。是面向全球中学生开设的计算机信息学学术竞赛。",
                update_time: 1570508469,
                create_time: 1570508469
            },
            {
                id: 100005,
                title: "蓝桥杯青少年创意编程比赛",
                logo:
                    "http://cdn.singera.cn/www.singera.cn/uploads/c2905eea-a302-41f0-9372-995ffb4734e7.png",
                desp:
                    "为促进软件和信息领域专业技术人才培养，普及青少年对人工智能设计的相关认知和技能，提高青少年的创新能力，由工业和信息化部人才交流中心举办的“第十一届蓝桥杯大赛青少年编程组比赛”开启啦，比赛以学校或课外培训机构为单位报名。",
                update_time: 1570499132,
                create_time: 1570499132
            },
            {
                id: 100006,
                title: "CSP/JS认证（原信息学奥赛）",
                logo:
                    "http://cdn.singera.cn/www.singera.cn/uploads/aa3a6da4-5d69-43a8-b6d6-1d9ab0ef875a.png",
                desp:
                    "CSP-JS认证是一项面向任何群体的信息学竞赛和普及活动，旨在向大众普及计算机科学知识；给那些有才华的并且热衷编程的人提供相互交流和学习的机会；通过竞赛和相关的活动培养和选拔优秀的计算机人才。",
                update_time: 1570502178,
                create_time: 1570502178
            }
        ]
    });
};
