<template>
    <div id="app">
        <div class="outer">
            <slot name="top"></slot>
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
            <slot name="bottom"></slot>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    }
};
</script>

<style>
html {
    width: 100%;
}
#app {
    position: relative;
    width: 100%;
}
.outer {
    margin: 0;
    padding: 0;
}
</style>
