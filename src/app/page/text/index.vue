<template>
    <div class="page-container">
        <HeaderBar :isBg="true" :isOpen="true"></HeaderBar>
        <div class="container">
            <div class="container-wrapper">
                <div class="title">重置密码</div>
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
                        v-model="newPwd"
                    >
                        <i
                            slot="prefix"
                            class="el-input__icon icon-info icon-pwd"
                        ></i>
                    </el-input>
                </div>
                <div class="wrappper-input reg-login-submit">
                    <el-button class="reg-login-submit-btn" @click="submit"
                        >完成</el-button
                    >
                </div>
                <div class="wrappper-input reg-login-tips">
                    <div class="tips-left"></div>
                    <div class="tips-right" @click="goLink(3)">返回登录</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Input, Button } from 'element-ui';
// import { checkPhone } from '@common/util';
import axios from 'axios';
import { API_LIST } from '@common/api';
import HeaderBar from '@components/header';
export default {
    name: 'ResetPwd',
    components: {
        'el-input': Input,
        'el-button': Button,
        HeaderBar
    },
    data() {
        return {
            phone: '',
            newPwd: ''
        };
    },
    methods: {
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
            const { pwd, newPwd } = this;
            if (pwd < 6) {
                window.Message({
                    message: '请设置6位以上的密码',
                    type: 'error'
                });
                return;
            }
            if (pwd !== newPwd) {
                window.Message({
                    message: '请确认密码',
                    type: 'error'
                });
                return;
            }
            axios
                .post(API_LIST.MODIFY_PASSED, {
                    pwd
                })
                .then(res => {
                    if (!res.status) {
                        window.Message({
                            message: '重置成功',
                            type: 'success'
                        });
                        this.$router.push('/login');
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
