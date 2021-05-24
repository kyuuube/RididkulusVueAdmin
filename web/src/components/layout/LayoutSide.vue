<template>
    <el-aside :width="collapsed ? '80px' : '256px'" class="layout-side">
        <div class="layout-logo">
            <img :src="logoSrc" alt="" />
            <span v-if="!collapsed">RIDIDKULUS</span>
        </div>
        <layout-menus :isCollapse="collapsed"></layout-menus>
    </el-aside>
</template>

<script type="text/javascript">
import LayoutMenus from './LayoutMenus';
import { mapActions, mapGetters } from 'vuex';
import * as $account from '../../store/modules/account/types';
export default {
    name: 'layout-side',
    components: {
        LayoutMenus
    },
    data() {
        return {
            logoSrc: require('../../assets/logo.png').default
        };
    },
    computed: {
        ...mapGetters($account.namespace, {
            collapsed: $account.getters.isCollapsed
        })
    },
    methods: {
        ...mapActions($account.namespace, {
            setCollapsed: $account.actions.setCollapsed
        }),
        toggleCollapse() {
            this.setCollapsed(!this.collapsed);
        }
    },
    mounted() {
        console.log(this.logoSrc);
    }
};
</script>

<style lang="less">
.layout-side {
    height: 100vh;
    background: #001529;
    z-index: 9;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    -webkit-transition-property: all;
    -webkit-transition-duration: 0.9s;
    -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    .layout-logo {
        display: flex;
        width: 230px;
        height: 60px;
        justify-items: center;
        align-items: center;
        /*background: #5b6270;*/
        /*border-radius: 3px;*/
        margin: 10px;
        img {
            flex: 1;
            max-width: 35px;
            height: 35px;
            padding: 0 10px;
        }
        span {
            flex: 2;
            color: #ffffff;
            font-size: 24px;
        }
    }
    .el-menu {
        border-right: none !important;
    }
}
.layout-side::-webkit-scrollbar {
    display: none;
}
</style>
