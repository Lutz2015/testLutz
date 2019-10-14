<template>
    <div class="page-container">
        <HeaderBar :isBg="true" :isOpen="true"></HeaderBar>
        <div class="container">
            <div class="container-wrapper">
                <div class="title">登录</div>
                <div class="wrappper-input reg-login-phone">
                    <el-input
                        placeholder="手机号"
                        type="tel"
                        maxlength="11"
                        v-model="phone"
                    >
                        <i
                            slot="prefix"
                            class="el-input__icon icon-info icon-phone"
                        ></i>
                    </el-input>
                </div>
                <div
                    class="wrappper-input reg-login-code"
                    v-if="is_mobile_login"
                >
                    <el-input
                        class="reg-login-code-input"
                        placeholder="图片验证码"
                        maxlength="5"
                        v-model="verificateCode"
                    >
                        <i
                            slot="prefix"
                            class="el-input__icon icon-info icon-code"
                        ></i>
                    </el-input>
                    <div
                        class="get-code"
                        @click="refreshCode"
                        :style="{ 'background-image': `url(${this.picImg})` }"
                    ></div>
                </div>
                <div
                    class="wrappper-input reg-login-code"
                    v-if="is_mobile_login"
                >
                    <el-input
                        class="reg-login-code-input"
                        placeholder="验证码"
                        @blur="codeBlur"
                        v-model="pwd"
                    >
                        <i
                            slot="prefix"
                            class="el-input__icon icon-info icon-code"
                        ></i>
                    </el-input>
                    <div
                        class="get-code"
                        :class="{ 'timer-code': isDisabled }"
                        :disabled="isDisabled"
                        @click="getSmsCode"
                    >
                        {{ !isDisabled ? "获取验证码" : `${second}s` }}
                    </div>
                </div>
                <!-- 密码登录 -->
                <div class="wrappper-input regireg-loginster-pwd" v-else>
                    <el-input
                        placeholder="密码"
                        minlength="6"
                        maxlength="20"
                        type="password"
                        v-model="pwd"
                    >
                        <i
                            slot="prefix"
                            class="el-input__icon icon-info icon-pwd"
                        ></i>
                    </el-input>
                </div>
                <div class="wrappper-input reg-login-submit">
                    <el-button class="reg-login-submit-btn" @click="submit"
                        >提交</el-button
                    >
                </div>
                <div class="wrappper-input reg-login-tips">
                    <div class="tips-left">
                        <span class="tips-left-text" @click="changeLogin()">{{
                            is_mobile_login ? "密码登录/" : "短信登录/"
                        }}</span>
                        <span class="tips-left-text" @click="goLink(1)"
                            >忘记密码</span
                        >
                    </div>
                    <div class="tips-right" @click="goLink(2)">新用户注册</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Input, Button } from 'element-ui';
import { checkPhone } from '@common/util';
import axios from 'axios';
import { API_LIST } from '@common/api';
import Cookies from 'js-cookie';
import HeaderBar from '@components/header';
export default {
    name: 'Login',
    components: {
        'el-input': Input,
        'el-button': Button,
        HeaderBar
    },
    data() {
        return {
            phone: '',
            pwd: '',
            verificateCode: '',
            random_code: '123456',
            picImg: 'http://www.singera.cn/website/captcha/pic?1234567',
            is_mobile_login: false,
            // 倒计时
            second: 60,
            isDisabled: false,
            timer: null
        };
    },
    created() {
        const isLogin = Cookies.get('isLogin');
        if (isLogin > 0) {
            this.$router.push('./home');
        }
        this.refreshCode();
    },
    methods: {
        // 切换登录方式
        changeLogin() {
            this.pwd = '';
            this.verificateCode = '';
            this.is_mobile_login = !this.is_mobile_login;
        },
        codeBlur() {
            this.isDisabled = false;
            clearInterval(this.timer);
        },
        refreshCode() {
            const random_code = Math.floor(Math.random() * 100000);
            this.picImg =
                'http://www.singera.cn/website/captcha/pic?' + random_code;
        },
        // 登录 --发送短信验证码
        getSmsCode() {
            if (this.isDisabled) {
                return;
            }
            if (!checkPhone(this.phone)) {
                window.Message({
                    message: '请填写正确手机号',
                    type: 'error'
                });
                return;
            }
            if (!this.verificateCode) {
                window.Message({
                    message: '请填写图片验证码',
                    type: 'error'
                });
                return;
            }
            axios
                .post(API_LIST.SMS_LOGIN, {
                    phone: this.phone,
                    captcha_code: this.verificateCode
                })
                .then(res => {
                    this.isDisabled = true;
                    if (!res.status) {
                        this.timer = setInterval(() => {
                            this.second--;
                            if (this.isDisabled <= 0) {
                                this.isDisabled = false;
                                clearInterval(this.timer);
                            }
                        }, 1000);
                    } else if (+res.status === 100102) {
                        window.Message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                })
                .catch(() => {
                    window.Message({
                        message: '服务器异常，请稍后再试',
                        type: 'error'
                    });
                });
        },
        goLink(val) {
            if (val === 1) {
                this.$router.push('/resetPwd');
            } else if (val === 2) {
                this.$router.push('/register');
            } else if (val === 3) {
                this.$router.push('/login');
            }
        },
        submit() {
            const { phone, pwd, verificateCode, is_mobile_login } = this;
            if (!checkPhone(phone)) {
                window.Message({
                    message: '请输入正确手机号',
                    type: 'error'
                });
                return;
            }
            if (pwd < 6) {
                window.Message({
                    message: '密码错误',
                    type: 'error'
                });
                return;
            }
            if (pwd < 6) {
                window.Message({
                    message: '密码错误',
                    type: 'error'
                });
                return;
            }
            if (is_mobile_login && !verificateCode) {
                window.Message({
                    message: '请填写图片验证码',
                    type: 'error'
                });
                return;
            }
            axios
                .post(API_LIST.LOGIN, {
                    phone,
                    passwd: pwd,
                    is_mobile_login
                })
                .then(res => {
                    if (!res.status) {
                        window.Message({
                            message: '登录成功',
                            type: 'success',
                            is_mobile_login: true
                        });
                        // role 1 为教师
                        if (+res.data.role) {
                            Cookies.set('isLogin', 2, { expires: 1 });
                        } else {
                            Cookies.set('isLogin', 1, { expires: 1 });
                        }

                        Cookies.set('userName', res.data.username, {
                            expires: 1
                        });
                        this.$router.push('/home');
                    } else {
                        window.Message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                })
                .catch(() => {
                    window.Message({
                        message: '服务器异常，请稍后再试',
                        type: 'error'
                    });
                });
        }
    }
};
</script>
<style lang="less" scoped>
@import "./style.less";
</style>
