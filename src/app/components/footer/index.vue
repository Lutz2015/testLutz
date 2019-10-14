<template lang="pug">
.footer
    .wrap
        .left 
            .code
                .code1
                    .img
                    .text 关注微信公众号<br>了解更多信息
                .code2
                    .img
                    .text 联系客服<br>获得更多资讯
            .about
                p 地址：天津市和平区佳怡国际写字楼D-2-807
                p 电话：16622103756
                p 邮箱：leibo@singera.com
                .connect
                    .qq
                    .weixin
                    .weibo
        .right
            .tit 免费领取试听课
            .form
                input(class="name" v-model="name"  placeholder="孩子姓名")
                input(class="class" v-model="cls" placeholder="孩子年纪")
                input(class="tel" v-model="tel" maxLength="11" placeholder="联系电话")
                .submit(@click="submit") 立即预约
</template>
<script>
import apis from './api';
export default {
    components: {},

    data() {
        return {
            headUrl: '',
            cls: '',
            name: '',
            tel: ''
        };
    },

    created() {},
    methods: {
        submit() {
            let { name, cls, tel } = this;
            if (!name || !cls || !tel) {
                window.Message({
                    message: '有未填项',
                    type: 'error'
                });
                return;
            }
            apis.submit({
                child_name: name,
                child_grade: cls,
                phone: tel
            })
                .then(res => {
                    if (!res.status) {
                        this.cls = '';
                        (this.name = ''), (this.tel = '');
                        window.Message({
                            message: '发送成功',
                            type: 'success'
                        });
                    } else {
                        window.Message({
                            message: '预约失败',
                            type: 'error'
                        });
                    }
                })
                .catch(() => {
                    window.Message({
                        message: '服务异常，请稍后再试',
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
