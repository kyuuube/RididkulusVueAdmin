<template>
    <div class="home">
        <el-container class="layout">
            <layout-side :class="showSide ? '' : 'not-show-side'" ref="layoutSide" :collapsed.sync="isCollapsed"></layout-side>
            <el-container direction="vertical">
                <layout-header @collapsed="collapsedSide" :is-collapsed="isCollapsed"></layout-header>
                <layout-tabs />
                <layout-content>
                    <!-- @Todo 当使用两个transition时会产生视觉上的两个routerview-->
                    <!--                    <transition name="fade-transform" mode="out-in">-->
                    <keep-alive>
                        <router-view :key="$route.fullPath" v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <!--                    </transition>-->
                    <!--                    <transition name="fade-transform" mode="out-in">-->
                    <router-view :key="$route.fullPath" v-if="!$route.meta.keepAlive"></router-view>
                    <!--                    </transition>-->
                    <el-backtop :visibility-height="100" target=".layout-content"></el-backtop>
                    <div class="footer">
                        <small>&copy; Copyright {{ $moment().format('YYYY') }}, benchiu@yandex.com</small>
                    </div>
                </layout-content>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import LayoutHeader from 'src/components/layout/LayoutHeader';
import LayoutSide from 'src/components/layout/LayoutSide';
import LayoutContent from 'src/components/layout/LayoutContent';
import LayoutTabs from 'src/components/layout/LayoutTabs';
import { mapGetters, mapActions } from 'vuex';
import * as $account from '../store/modules/account/types';
export default {
    name: 'home',
    components: {
        LayoutHeader,
        LayoutSide,
        LayoutContent,
        LayoutTabs
    },
    data() {
        return {
            showSide: true
        };
    },
    computed: {
        ...mapGetters($account.namespace, {
            isCollapsed: $account.getters.isCollapsed
        })
    },
    methods: {
        ...mapActions($account.namespace, {
            setCollapsed: $account.actions.setCollapsed
        }),
        collapsedSide() {
            this.$refs.layoutSide.toggleCollapse();
        }
    },
    mounted() {
        window.setTimeout(() => {
            // const loading = document.querySelector('.mask');
            // loading.style.display = 'none';
            const mql = window.matchMedia('(max-width: 1000px)');
            const mql2 = window.matchMedia('(max-width: 800px)');
            mql.addListener(e => {
                if (e.matches) {
                    console.log('matches!!!!');
                    this.setCollapsed(true);
                } else {
                    console.log('not matches!!!!');
                    this.setCollapsed(false);
                }
            });
            mql2.addListener(e => {
                if (e.matches) {
                    console.log('matches!!!!');
                    this.showSide = false;
                } else {
                    console.log('not matches!!!!');
                    this.showSide = true;
                }
            });
        }, 1000);
    }
};
</script>

<style lang="less">
@import url(../../src/style/dark/index);
.home {
    height: 100vh;
    width: 100%;
    background: #f5f7f9;
    .layout {
        height: 100vh;
    }
    .footer {
        padding: 40px;
        text-align: center;
    }
    .not-show-side {
        width: 0 !important;
    }
}
</style>
