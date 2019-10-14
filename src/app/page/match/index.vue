<template>
    <div class="page-container">
        <HeaderBar :isBg="true"></HeaderBar>
        <div style="height: 80px"></div>
        <div
            class="title-image"
            :style="{ backgroundImage: `url(${bannerImg})` }"
        ></div>
        <div class="match-content" v-if="isMatch">
            <div class="content-title">赛事及水平测试</div>
            <ul class="match-list" v-if="matchList.length > 0">
                <template v-for="(item, index) in matchList">
                    <li
                        class="item-info"
                        :class="`item-${index}`"
                        :key="index"
                        :style="{ backgroundImage: `url(${item.logo})` }"
                    >
                        <div class="item-title">{{ item.title }}</div>
                        <router-link
                            class="item-btn"
                            :to="{ path: 'match', query: { id: item.id } }"
                            >查看详情</router-link
                        >
                    </li>
                </template>
            </ul>
            <div class="match-list" v-else>暂无数据</div>
            <div class="content-title">全年赛事活动日程安排</div>
            <div class="match-list match-plan"></div>
        </div>
        <div class="match-detail" v-else>
            <div class="detail-title">{{ matchDetail.title }}</div>
            <div class="detail-desp">{{ matchDetail.desp }}</div>
            <div
                class="detail-logo"
                :style="{ backgroundImage: `url(${matchDetail.logo})` }"
            ></div>
            <div class="detail-content" v-html="matchDetail.content"></div>
        </div>
    </div>
</template>
<script>
import HeaderBar from '@components/header';
import { API_LIST } from '@common/api';
import axios from 'axios';
export default {
    components: {
        HeaderBar
    },
    data() {
        return {
            bannerImg: '',
            isMatch: true,
            matchList: [],
            matchDetail: {}
        };
    },
    beforeRouteUpdate(to, from, next) {
        if (+to.query.id > 0) {
            if (this.isMatch) {
                this.isMatch = false;
            }
            this.getDetailData(to.query.id);
        } else {
            if (!this.isMatch) {
                this.isMatch = true;
                this.getMatchList();
            }
        }
        next();
    },
    created() {
        this.getBannerUrl();
        if (+this.$route.query.id > 0) {
            this.isMatch = false;
            this.getDetailData(this.$route.query.id);
        } else {
            this.isMatch = true;
            this.getMatchList();
        }
    },
    methods: {
        // banner
        getBannerUrl() {
            axios
                .get(API_LIST.BANNER_IMAGE, {
                    params: {
                        type: 3
                    }
                })
                .then(res => {
                    if (!res.status) {
                        this.bannerImg = res.data.addr;
                    }
                })
                .catch(() => {
                    // console.log(err);
                });
        },
        // 获取赛事列表
        getMatchList() {
            axios
                .get(API_LIST.MATCH_LIST)
                .then(res => {
                    if (!res.status && res.data && res.data.length > 0) {
                        this.matchList = res.data;
                    }
                })
                .catch(() => {
                    window.Message({
                        message: '服务器异常，请稍后再试',
                        type: 'error'
                    });
                });
        },
        // 获取赛事详情
        getDetailData(id) {
            axios
                .get(API_LIST.MATCH_DETAIL, {
                    params: {
                        id
                    }
                })
                .then(res => {
                    if (!res.status) {
                        this.matchDetail = res.data;
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
