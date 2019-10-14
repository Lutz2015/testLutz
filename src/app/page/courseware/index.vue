<template>
    <div id="course-container" class="page-container">
        <HeaderBar :isBg="true"></HeaderBar>
        <div style="height: 80px"></div>
        <div
            class="title-image"
            :style="{ backgroundImage: `url(${bannerImg})` }"
        ></div>
        <div class="course_teacher" v-if="isTeacher">
            <div class="course-title scratch-title"></div>
            <div class="course-list">
                <swiper class="swiper-no-swiping" :options="scratchOption">
                    <swiper-slide
                        class="content"
                        v-for="(item, index) in scratchList"
                        :key="index"
                    >
                        <div class="content-title"></div>
                        <div class="title basic-title">{{ item.title }}</div>
                        <div
                            class="logo basic-logo"
                            @click="getCourseDetail(item.id, 1)"
                            :style="{ backgroundImage: `url(${item.logo})` }"
                        ></div>
                        <div class="title plan-title">
                            {{ item.plan_title }}
                        </div>
                        <div
                            class="logo plan-logo"
                            @click="getCourseDetail(item.id, 2)"
                            :style="{
                                backgroundImage: `url(${item.plan_logo})`
                            }"
                        ></div>
                    </swiper-slide>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
            <div class="course-title python-title"></div>
            <div class="course-list">
                <swiper class="swiper-no-swiping" :options="scratchOption">
                    <swiper-slide
                        class="content"
                        v-for="(item, index) in scratchList"
                        :key="index"
                    >
                        <div class="content-title"></div>
                        <div class="title basic-title">{{ item.title }}</div>
                        <div
                            class="logo basic-logo"
                            @click="getCourseDetail(item.id, 1)"
                            :style="{ backgroundImage: `url(${item.logo})` }"
                        ></div>
                        <div class="title plan-title">
                            {{ item.plan_title }}
                        </div>
                        <div
                            class="logo plan-logo"
                            @click="getCourseDetail(item.id, 2)"
                            :style="{
                                backgroundImage: `url(${item.plan_logo})`
                            }"
                        ></div>
                    </swiper-slide>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
        </div>
        <div class="course_user" v-else>
            <div class="course-title system-title"></div>
            <div class="user-image system-image"></div>
            <div class="course-title plan-title"></div>
            <div class="user-image plan-image"></div>
            <div class="course-title intro-title"></div>
            <div class="intro-info">
                <div class="intro-info-image left-image">
                    <div class="video-info left-video">
                        <div class="video-title">Scratch操作演示</div>
                        <video
                            class="video-source"
                            controls=""
                            @click="viedoplay(1)"
                            poster="https://static.codemao.cn/lesson/assets/images/p3坐标封面.jpg"
                            src="https://static.codemao.cn/xin-shou-ru-men/GK-02fv51cdV2.3.0_%E9%87%8D%E5%A4%8D%E6%89%A7%E8%A1%8C.mp4"
                        ></video>
                    </div>
                    <div class="intro-info-text left-text">
                        <p>
                            Scratch是以积木进行的编程，它保护了常见的编程概念。
                        </p>
                        <p>
                            1、程序的是三种基本结构
                            顺序结构、循环结构、选择结构。
                        </p>
                        <p>2、数据变量的定义和链表的使用</p>
                        <p>3、在设计中引入事件、线程、同步的概念</p>
                    </div>
                </div>
            </div>
            <div class="intro-info">
                <div class="intro-info-image right-image">
                    <div class="video-info right-video">
                        <div class="video-title">Python操作演示</div>
                        <video
                            class="video-source"
                            controls=""
                            @click="viedoplay(2)"
                            poster="https://static.codemao.cn/whitepaw/lesson/assets/p2%E9%87%8D%E5%A4%8D%E6%89%A7%E8%A1%8C%E5%B0%81%E9%9D%A2.jpg"
                            src="https://static.codemao.cn/xin-shou-ru-men/GK-01gkke16V3.0%28%E5%AE%98%29_%E6%8E%A7%E5%88%B6%E9%98%BF%E7%9F%AD.mp4"
                        ></video>
                    </div>
                    <div class="intro-info-text right-text">
                        <p>
                            Python语言提供了三种数字类型：整数、浮点数和复数。
                        </p>
                        <p>1、操作系统主要的设计原则：使用方便，高效工作</p>
                        <p>
                            2、操作系统分为：批处理操作系统、实时操作系统、网络操作系统、分时操作系统、分布式操作系统、多机作系统和嵌入式操作系统
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <el-image-viewer
            v-if="showViewer"
            :on-close="closeViewer"
            :url-list="srcList"
        />
    </div>
</template>
<script>
import HeaderBar from '@components/header';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { API_LIST } from '@common/api';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { Image } from 'element-ui';
import ElImageViewer from 'element-ui/packages/image/src/image-viewer';
export default {
    components: {
        HeaderBar,
        swiper,
        swiperSlide,
        'el-image-viewer': ElImageViewer
    },
    data() {
        return {
            bannerImg: '',
            isTeacher: false,
            scratchList: [],
            pythonList: [],
            scratchOption: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                loop: true,
                loopFillGroupWithBlank: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            },
            pythonOption: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 3,
                loop: true,
                loopFillGroupWithBlank: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            },
            srcList: [],
            showViewer: false,
            $video1: null,
            $video2: null
        };
    },

    created() {
        const isLogin = Cookies.get('isLogin');
        if (isLogin > 1) {
            this.isTeacher = true;
        }
        this.getBannerUrl();
        this.getCourseList(1);
        this.getCourseList(2);
    },
    mounted() {
        document.getElementById('course-container').oncontextmenu = function() {
            return false;
        };
        if (!this.isTeacher) {
            this.$video1 = this.$el.getElementsByTagName('video')[0];
            this.$video2 = this.$el.getElementsByTagName('video')[1];
        }
    },
    methods: {
        // banner
        getBannerUrl() {
            axios
                .get(API_LIST.BANNER_IMAGE, {
                    params: {
                        type: 2
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
        // 获取课程列表
        getCourseList(type) {
            axios
                .get(API_LIST.COURSE_LIST, {
                    params: {
                        q: type
                    }
                })
                .then(res => {
                    if (!res.status && res.data && res.data.length > 0) {
                        if (type === 1) {
                            this.scratchList = res.data;
                        } else if (type === 2) {
                            this.pythonList = res.data;
                        }
                    }
                })
                .catch(() => {
                    //
                });
        },
        // 获取ppt 详情详情
        getCourseDetail(id, t) {
            axios
                .get(API_LIST.COURSE_DETAIL, {
                    params: {
                        q: '100004',
                        t
                    }
                })
                .then(res => {
                    if (!res.status && res.data.length > 0) {
                        this.srcList = res.data;
                        this.showViewer = true;
                    }
                })
                .catch(() => {
                    window.Message({
                        message: '服务器异常，请稍后再试',
                        type: 'error'
                    });
                });
        },
        // 关闭查看器
        closeViewer() {
            this.showViewer = false;
        },
        viedoplay(type) {
            if (type === 1) {
                if (!this.$video2.paused) {
                    this.$video2.pause();
                }
            } else {
                if (!this.$video1.paused) {
                    this.$video1.pause();
                }
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import "./style.less";
</style>
