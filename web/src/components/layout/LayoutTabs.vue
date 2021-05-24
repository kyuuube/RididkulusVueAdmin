<template>
    <div class="layout-tabs">
        <el-tabs v-model="currentMenuId" type="border-card" closable @tab-remove="closeTab" @tab-click="handleTabClick">
            <el-tab-pane :key="index" v-for="(item, index) in tabList" :name="item.id">
                <span slot="label"
                    ><i :class="`iconfont ${item.icon}`" /> <span>{{ item.name }}</span></span
                >
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import * as $tabs from '../../store/modules/tabs/types';
import * as $account from '../../store/modules/account/types';

export default {
    data() {
        return {
            currentTab: '',
            tabs: []
        };
    },
    computed: {
        ...mapGetters($tabs.namespace, {
            tabMap: $tabs.getters.tabMap,
            tabList: $tabs.getters.tabList
        }),
        ...mapGetters($account.namespace, {
            currentMenuId: $account.getters.currentMenuId
        })
    },
    watch: {
        currentMenuId: {
            handler: function() {
                this.currentTab = this.currentMenuId;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        ...mapActions($tabs.namespace, {
            setTabMap: $tabs.actions.setTabMap,
            setTabList: $tabs.actions.setTabList
        }),
        ...mapActions($account.namespace, {
            setCurrentMenuId: $account.actions.setCurrentMenuId
        }),
        handleTabClick(tab) {
            this.setCurrentMenuId(tab.name);
            const url = this.tabList[tab.index].url || '/dashboard';
            this.$router.push(url);
        },
        closeTab(id) {
            if (this.currentMenuId === id) {
                if (this.tabList.length === 1) {
                    this.setTabList([{ id: 1, name: '工作台', url: '/dashboard', icon: 'el-icon-s-data', parentId: 0 }]);
                    return this.$router.push('/dashboard');
                }
                this.tabList.forEach((tab, index) => {
                    if (tab.id === id) {
                        let nextTab = this.tabList[index + 1] || this.tabList[index - 1];
                        if (nextTab) {
                            this.setCurrentMenuId(nextTab.id);
                            this.currentTab = nextTab.id;
                            this.$router.push(nextTab.url);
                        }
                    }
                });
            }
            this.setTabList(this.tabList.filter(tab => tab.id !== id));
            // TODO 需要清除map中的记录
            // if (this.tabMap.has(id)) {
            //     let tabMap = new Map(this.tabMap);
            //     tabMap.delete(id);
            //     this.setTabMap(tabMap);
            // }
            // let tabMap = new Map(this.tabMap);
            // tabMap.delete(id);
            // this.setTabMap(tabMap);
        }
    }
};
</script>

<style lang="less">
.layout-tabs {
    //padding: 5px 10px 0 10px;
    padding-top: 5px;
    background-color: #fff;
    .el-tabs__header {
        border-bottom: none;
    }
    .el-tabs__content {
        display: none;
    }
}
</style>
