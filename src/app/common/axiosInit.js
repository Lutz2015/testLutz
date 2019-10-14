import axios from 'axios';
import { Message } from 'element-ui';
window.Message = Message;
axios.interceptors.request.use(
    config => {
        config.headers['Accept'] = 'application/json';
        config.withCredentials = true;
        return config;
    },
    err => {
        // 后续看看这块是否有必要统一冒泡之后上报
        /* eslint-disable no-console */
        Message({
            message: '网络错误',
            type: 'error'
        });
        console.error(err);

        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    res => {
        const { data } = res;
        if (data && data.status === 0) {
            return data;
        }
        Message({
            message: data.msg,
            type: 'error'
        });
    },
    err => {
        // 后续看看这块是否有必要统一冒泡之后上报
        /* eslint-disable no-console */

        Message({
            message: '服务器错误',
            type: 'error'
        });
        console.error(err);
        return Promise.reject(err);
    }
);
