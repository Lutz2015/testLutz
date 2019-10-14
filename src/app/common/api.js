// 接口域名
// const API_DOMAIN = process.env.NODE_ENV !== 'production' ? '' : 'https://www.singera.cn';
const API_DOMAIN = '';

// api列表
const API_LIST = {
    // banner图  1- 首页banner 2- 课程体系 3- 赛事
    BANNER_IMAGE: `${API_DOMAIN}/website/banner`,
    // 首页 用户关心的问题列表
    HOME_ARTICLE_LIST: `${API_DOMAIN}/website/article/list`,
    // 首页 用户关心的问题详情
    HOME_ARTICLE_DETAIL: `${API_DOMAIN}/website/article/detail`,

    // 保存课程预约信息
    APPOINTMENT: `${API_DOMAIN}/website/appointment`,

    // 注册
    REGISTER: `${API_DOMAIN}/website/member/logup`,
    // 登录
    LOGIN: `${API_DOMAIN}/website/member/login`,
    // 退出登录
    LOGOUT: `${API_DOMAIN}/u/member/logout`,
    // 重置密码
    MODIFY_PASSED: `${API_DOMAIN}/u/member/modifypasswd`,

    // 通过短信登录
    SMS_LOGIN: `${API_DOMAIN}/website/sms/user_login`,
    // 注册短信验证
    SMS_REGISTER: `${API_DOMAIN}/website/sms/user_loginup`,
    // 找回密码--第一步短信验证
    SMS_PASSWD: `${API_DOMAIN}/website/sms/passwd_change`,

    // 图片随机码
    CODE_IMG: `${API_DOMAIN}/website/captcha/pic`,

    // 忘记密码-找回密码
    FOGET_PASSWD: `${API_DOMAIN}/website/member/fogetpasswd`,

    // 赛事-赛事列表, 默认拉取6条，发布时间正排
    MATCH_LIST: `${API_DOMAIN}/website/match/list`,
    // 赛事详情
    MATCH_DETAIL: `${API_DOMAIN}/website/match/detail`,
    // 首页 - 最新赛事, 默认拉取4条, 发布时间倒排
    HOME_MATCH: `${API_DOMAIN}/website/match/newest`,

    // 课程体系-教师端课程列表
    COURSE_LIST: `${API_DOMAIN}/u/courseware/list`,
    // 课程体系-普通用户 gif图信息
    COURSE_GIF: `${API_DOMAIN}/website/courseware/gif`,
    // 课程体系-教师端-教案-教学详情
    COURSE_DETAIL: `${API_DOMAIN}/u/courseware/detail`
};

export { API_LIST };
