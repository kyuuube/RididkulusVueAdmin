<template>
    <div class="app">
        <router-view></router-view>
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>
<script>
// aois
import * as commonApi from './apis/commonApi';
export default {
    name: 'app',
    methods: {
        async getCookies() {
            const { data } = await commonApi.XSRFConfig();
            document.cookie = `XSRF-TOKEN=${data}`;
        }
    },
    mounted() {
        //  [App.vue specific] When App.vue is finish loading finish the progress bar
        this.$Progress.finish();
    },
    created() {
        this.getCookies();
        //  [App.vue specific] When App.vue is first loaded start the progress bar
        this.$Progress.start();
        //  hook the progress bar to start before we move router-view
        this.$router.beforeEach((to, from, next) => {
            //  does the page we want to go to have a meta.progress object
            if (to.meta.progress !== undefined) {
                let meta = to.meta.progress;
                // parse meta tags
                this.$Progress.parseMeta(meta);
            }
            //  start the progress bar
            this.$Progress.start();
            //  continue to next page
            next();
        });
        //  hook the progress bar to finish after we've finished moving router-view
        // eslint-disable-next-line no-unused-vars
        this.$router.afterEach(() => {
            //  finish the progress bar
            this.$Progress.finish();
        });
    }
};
</script>
<style lang="less">
@import '../src/style/index.less';
</style>
