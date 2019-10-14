/**
 * @file router.js
 * @author https://github.com/DOBEEE
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Wrapper from '@/app/page/Wrapper';
import notFound from '@/app/page/notfound';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Wrapper,
        // /kwaitask -> index
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: () =>
                    import(/* webpackChunkName: "home" */ '@/app/page/home'),
                meta: {
                    page: 'Home',
                    title: '奇迹创客'
                }
            },
            {
                path: 'login',
                component: () =>
                    import(/* webpackChunkName: "login" */ '@/app/page/login'),
                meta: {
                    page: 'Login',
                    title: '奇迹创客'
                }
            },
            {
                path: 'register',
                component: () =>
                    import(
                        /* webpackChunkName: "register" */ '@/app/page/register'
                    ),
                meta: {
                    page: 'Register',
                    title: '奇迹创客'
                }
            },
            {
                path: 'resetPwd',
                component: () =>
                    import(
                        /* webpackChunkName: "resetPwd" */ '@/app/page/resetPwd'
                    ),
                meta: {
                    page: 'ResetPwd',
                    title: '奇迹创客'
                }
            },
            {
                path: 'agreement',
                component: () =>
                    import(
                        /* webpackChunkName: "agreement" */ '@/app/page/agreement'
                    ),
                meta: {
                    page: 'Agreement',
                    title: '奇迹创客'
                }
            },
            {
                path: 'match',
                component: () =>
                    import(/* webpackChunkName: "match" */ '@/app/page/match'),
                meta: {
                    page: 'Match',
                    title: '奇迹创客'
                }
            },
            {
                path: 'courseware',
                component: () =>
                    import(
                        /* webpackChunkName: "courseware" */ '@/app/page/courseware'
                    ),
                meta: {
                    page: 'Courseware',
                    title: '奇迹创客'
                }
            }
        ]
    },
    {
        path: '*',
        name: '404',
        component: notFound
    }
];

export default new VueRouter({
    routes
});
