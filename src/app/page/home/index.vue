<template>
    <div class="home">
        <HeaderBar></HeaderBar>
        <div class="header">
            <div class="header-pic">
                <img :src="bannerImg" alt="" />
            </div>
        </div>
        <div class="section1 section">
            <div class="title"></div>
            <div class="content">
                <div class="item" v-for="(v, k) in config" :key="k">
                    <div class="img"></div>
                    <div class="tit">{{ v.title }}</div>
                    <div class="en">{{ v.en }}</div>
                </div>
            </div>
        </div>
        <div class="section2 section">
            <div class="title"></div>
            <div class="content"></div>
        </div>
        <div class="section3 section" v-if="matchList.length > 0">
            <div class="title"></div>
            <swiper :options="matchOption">
                <swiper-slide
                    class="content"
                    v-for="(item, index) in matchList"
                    :key="index"
                >
                    <div class="left">
                        <div class="left-title">{{ item.title }}</div>
                        <div class="left-desp">{{ item.desp }}</div>
                    </div>
                    <div
                        class="right"
                        :style="{ backgroundImage: `url(${item.logo})` }"
                    ></div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="section4 section">
            <div class="title"></div>
            <swiper
                :options="qsOption"
                style="margin-top:20px; padding: 30px 0;"
            >
                <swiper-slide
                    class="content"
                    v-for="(item, index) in qsList"
                    :key="index"
                >
                    <div
                        class="img"
                        :style="{ backgroundImage: `url(${item.logo})` }"
                    ></div>
                    <div class="desp">
                        <div class="tit">{{ item.title }}</div>
                        <div class="desp-text">{{ item.desp }}</div>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>
<script>
import HeaderBar from '@components/header';
import '../../assets/erqi_19.png';
// require styles
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { API_LIST } from '@common/api';
import axios from 'axios';
export default {
    components: {
        HeaderBar,
        swiper,
        swiperSlide
    },

    data() {
        return {
            isLogin: false,
            config: [
                {
                    title: '适应科技社会',
                    en: 'Adapt to Technology Society'
                },
                {
                    title: '为孩子升学加分',
                    en: 'Higher school score'
                },
                {
                    title: '培养罗辑思维',
                    en: 'Develop logical thinking'
                },
                {
                    title: '教会孩子如何思考',
                    en: 'Teaching children how to think'
                },
                {
                    title: '被纳入新课标',
                    en: 'New curriculum standard'
                },
                {
                    title: '孩子成长必备技能',
                    en: 'Necessary skills in growing up'
                }
            ],
            qsList: [],
            bannerImg: '',
            qsOption: {
                slidesPerView: 2,
                slidesPerColumn: 3,
                spaceBetween: 28,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            },
            matchList: [],
            matchOption: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }
        };
    },
    created() {
        this.getBannerUrl();
        this.getQsList();
        this.getMatchList();
    },
    methods: {
        getBannerUrl() {
            axios
                .get(API_LIST.BANNER_IMAGE, {
                    params: {
                        type: 1
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
        qsClick() {
            // this.$router.push(val.path);
        },
        // 获取问题列表
        getQsList() {
            axios
                .get(API_LIST.HOME_ARTICLE_LIST)
                .then(res => {
                    if (!res.status && res.data && res.data.length > 0) {
                        this.qsList = res.data || [];
                    }
                })
                .catch(() => {
                    // console.log(err);
                });
        },
        // 获取赛事列表
        getMatchList() {
            axios
                .get(API_LIST.HOME_MATCH)
                .then(res => {
                    if (!res.status && res.data && res.data.length > 0) {
                        this.matchList = res.data || [];
                    }
                })
                .catch(() => {
                    // console.log(err);
                });
        }
    }
};
</script>
<style lang="less" scoped>
@import "./style.less";
</style>
