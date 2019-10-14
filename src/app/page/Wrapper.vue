<template>
    <div class="wrapper">
        <router-view></router-view>
        <Footer />
    </div>
</template>

<script>
import Footer from '@components/footer';
export default {
    components: {
        Footer
    },
    data() {
        return {};
    },
    beforeMount() {
        if (this.$route.meta.title) {
            // 设置页面title
            document.title = this.$route.meta.title;
        }
    }
};
</script>

<style lang="less">
.wrapper {
    position: relative;
    margin: 0;
    min-height: 100vh;
    background-color: #fff;
}
</style>
