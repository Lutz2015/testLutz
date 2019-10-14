/**
 * @file main.js
 * @author aosyang<yangyanzhao@baidu.com>
 */
import Vue from 'vue';

import { store, router, FrameIndex } from '../app/base/index';
// import {Loadmore} from 'mint-ui';
// Vue.component(Loadmore.name, Loadmore);
import '@common/css/normalize.css';
import '@common/axiosInit';
import 'element-ui/lib/theme-chalk/index.css';

new Vue({
    el: '#app',
    components: { FrameIndex },
    router,
    store,
    template: '<FrameIndex></FrameIndex>'
});
