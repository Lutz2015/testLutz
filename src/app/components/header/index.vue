<template>
    <div class="header-bar" :class="{ headBg: isBg }">
        <div class="wrap">
            <div class="logo"></div>
            <div class="tags">
                <div class="item" v-for="(val, index) in tabList" :key="index">
                    <router-link :to="val.path">{{ val.name }}</router-link>
                </div>
            </div>
            <div class="userinfo" v-if="!isOpen">
                <el-dropdown v-if="isLogin">
                    <span class="el-dropdown-link ">
                        <i class="username"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            icon="el-icon-user-solid"
                            class="user-list clearfix"
                            >{{ userName }}</el-dropdown-item
                        >
                        <el-dropdown-item
                            icon="el-icon-switch-button"
                            @click="logout"
                            class="user-list user-logout clearfix"
                            >退出登录</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="login" @click="golink" v-else>登录</div>
            </div>
        </div>
    </div>
</template>
<script>
import config from './config';
import { Dropdown, DropdownMenu } from 'element-ui';
import Cookies from 'js-cookie';
import { API_LIST } from '@common/api';
import axios from 'axios';
export default {
    name: 'headerbar',
    props: {
        isBg: {
            type: Boolean,
            value: false
        },
        isOpen: {
            type: Boolean,
            value: false
        }
    },
    components: {
        'el-dropdown': Dropdown,
        'el-dropdown-menu': DropdownMenu
    },
    data() {
        return {
            tabList: config.tabList,
            headUrl: '',
            userName: '',
            isLogin: false
        };
    },
    // beforeRouteUpdate(to, from, next){
    //     if (+to.path === 'Login' && this.isLogin) {
    //         this.$router.push('./home');
    //     }
    //     next();
    // },
    created() {
        this.getUserInfo();
    },
    methods: {
        // 获取用户信息
        getUserInfo() {
            const isLogin = Cookies.get('isLogin');
            if (+isLogin > 0) {
                this.isLogin = true;
                this.userName = Cookies.get('userName');
            } else {
                this.isLogin = false;
            }
        },
        logout() {
            axios
                .post(API_LIST.LOGOUT)
                .then(res => {
                    if (!res.status) {
                        Cookies.remove('isLogin');
                        Cookies.remove('userName');
                        this.isLogin = false;
                        window.Message({
                            message: '已退出',
                            type: 'success'
                        });
                    }
                })
                .catch(() => {
                    window.Message({
                        message: '退出失败',
                        type: 'error'
                    });
                });
        },
        tagsHandle(val) {
            this.$router.push(val.path);
        },
        golink() {
            this.$router.push('/login');
        }
    }
};
</script>
<style lang="less" scoped>
@import "./style.less";
</style>
