/**
 * @file util.js 工具函数
 * @author zhouhui
 */

// 检查emoji 字符
/*eslint-disable */
const isEmojiCharacter = substring => {
    for (var i = 0; i < substring.length; i++) {
        var hs = substring.charCodeAt(i);
        if (hs >= 0xd800 && hs <= 0xdbff) {
            if (substring.length > 1) {
                var ls = substring.charCodeAt(i + 1);
                var uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000;
                if (uc >= 0x1d000 && uc <= 0x1f77f) {
                    return true;
                }
            }
        } else if (substring.length > 1) {
            var ls = substring.charCodeAt(i + 1);
            if (ls == 0x20e3) {
                return true;
            }
        } else {
            if (hs >= 0x2100 && hs <= 0x27ff) {
                return true;
            } else if (hs >= 0x2b05 && hs <= 0x2b07) {
                return true;
            } else if (hs >= 0x2934 && hs <= 0x2935) {
                return true;
            } else if (hs >= 0x3297 && hs <= 0x3299) {
                return true;
            } else if (
                hs == 0xa9 ||
                hs == 0xae ||
                hs == 0x303d ||
                hs == 0x3030 ||
                hs == 0x2b55 ||
                hs == 0x2b1c ||
                hs == 0x2b1b ||
                hs == 0x2b50
            ) {
                return true;
            }
        }
    }
};
/* eslint-enable */

// 获取字符长度
const getByteLen = str => {
    if (!str) {
        return 0;
    }
    if (typeof str !== 'string') {
        str += '';
    }
    // eslint-disable-next-line no-control-regex
    return str.replace(/[^\x00-\xff]/g, '01').length;
};

const sortByKeyFn = key => {
    return (a, b) => {
        const value1 = a[key];
        const value2 = b[key];
        return value1 - value2;
    };
};

const checkPhone = val => {
    return /^1[3456789]\d{9}$/.test(val);
};

const Cookie = {
    setCookie(name, value, time) {
        let strsec = Cookie.getsec(time);
        let exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie =
            name + '=' + escape(value) + ';expires=' + exp.toGMTString();
    },
    // 读取cookies
    getCookie(cname) {
        let name = cname + '=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },
    // 删除cookies
    delCookie(name) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = Cookie.getCookie(name);
        if (cval != null)
            document.cookie =
                name + '=' + cval + ';expires=' + exp.toGMTString();
    },
    // s  h d   1天  == d1
    getsec(str) {
        let str1 = str.substring(1, str.length) * 1;
        let str2 = str.substring(0, 1);
        if (str2 == 's') {
            return str1 * 1000;
        } else if (str2 == 'h') {
            return str1 * 60 * 60 * 1000;
        } else if (str2 == 'd') {
            return str1 * 24 * 60 * 60 * 1000;
        }
    }
};
export { isEmojiCharacter, getByteLen, sortByKeyFn, checkPhone, Cookie };
