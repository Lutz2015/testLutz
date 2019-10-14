<template>
    <div class="page-container">
        <HeaderBar :isBg="true" :isOpen="true"></HeaderBar>
        <div class="container">
            <div class="container-wrapper">
                <div class="title">注册</div>
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
                <div class="wrappper-input reg-login-pwd">
                    <el-input
                        placeholder="设置密码"
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
                <div class="wrappper-input reg-login-pwd">
                    <el-input
                        placeholder="确认密码"
                        minlength="6"
                        maxlength="20"
                        type="password"
                        v-model="confirmCode"
                    >
                        <i
                            slot="prefix"
                            class="el-input__icon icon-info icon-pwd-confirm"
                        ></i>
                    </el-input>
                </div>
                <div class="wrappper-input reg-login-code">
                    <el-input
                        class="reg-login-code-input"
                        placeholder="图片验证码"
                        minlength="5"
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
                <div class="wrappper-input reg-login-code">
                    <el-input
                        class="reg-login-code-input"
                        placeholder="验证码"
                        @blur="codeBlur"
                        v-model="code"
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
                <div class="wrappper-input reg-login-submit">
                    <el-button class="reg-login-submit-btn" @click="submit"
                        >提交</el-button
                    >
                </div>
                <div class="wrappper-input reg-login-tips">
                    <div class="tips-left">
                        <input
                            class="tips-left-checkbox"
                            v-model="isCheckbox"
                            type="checkbox"
                        />
                        <span class="tips-left-text"
                            >我已阅读<router-link to="/agreement"
                                >《奇迹创客》</router-link
                            >相关协议</span
                        >
                    </div>
                    <div class="tips-right" @click="goLink(3)">返回登录</div>
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
import HeaderBar from '@components/header';
export default {
    name: 'Register',
    components: {
        'el-input': Input,
        'el-button': Button,
        HeaderBar
    },
    data() {
        return {
            phone: '',
            code: '',
            pwd: '',
            confirmCode: '',
            isCheckbox: '',
            verificateCode: '',
            picImg: '',
            // 倒计时
            second: 60,
            isDisabled: false,
            timer: null
        };
    },
    created() {
        this.refreshCode();
    },
    methods: {
        refreshCode() {
            const random_code = Math.floor(Math.random() * 100000);
            this.picImg =
                'http://www.singera.cn/website/captcha/pic?' + random_code;
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
        codeBlur() {
            this.isDisabled = false;
            clearInterval(this.timer);
        },
        // 注册 --发送验证码
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
                .post(API_LIST.SMS_REGISTER, {
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
        submit() {
            const {
                phone,
                code,
                pwd,
                confirmCode,
                isCheckbox,
                verificateCode
            } = this;
            if (!checkPhone(phone)) {
                window.Message({
                    message: '请填写正确手机号',
                    type: 'error'
                });
                return;
            }
            if (!code) {
                window.Message({
                    message: '请填写验证码',
                    type: 'error'
                });
                return;
            } else if (code < 6) {
                window.Message({
                    message: '请填写正确验证码',
                    type: 'error'
                });
                return;
            }
            if (pwd < 6) {
                window.Message({
                    message: '请设置6位以上的密码',
                    type: 'error'
                });
                return;
            }
            if (confirmCode !== pwd) {
                window.Message({
                    message: '请确认密码',
                    type: 'error'
                });
            }
            if (!verificateCode) {
                window.Message({
                    message: '请填写验证码',
                    type: 'error'
                });
                return;
            }
            if (!isCheckbox) {
                window.Message({
                    message: '请确认协议后提交',
                    type: 'error'
                });
                return;
            }
            axios
                .post(API_LIST.REGISTER, {
                    phone,
                    passwd: pwd,
                    sms_code: code
                })
                .then(res => {
                    if (!res.status) {
                        window.Message({
                            message: '注册成功',
                            type: 'success'
                        });
                        this.$router.push('/login');
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
