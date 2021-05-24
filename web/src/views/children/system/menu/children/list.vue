<template>
    <base-content search class="menu-list">
        <div slot="header">
            <el-breadcrumb>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
                <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
            </el-breadcrumb>
            <h2>菜单管理列表</h2>
        </div>

        <div slot="search">
            <el-form ref="formInline" inline>
                <el-form-item prop="user">
                    <el-input size="small" clearable type="text" v-model="keywords" placeholder="输入关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="loadMenuList">搜 索</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <div class="table-toolbar">
                <el-row type="flex" justify="space-between">
                    <div>查询表格</div>
                    <div>
                        <el-button size="small" @click="$router.push('/system/menu/add')" type="primary" icon="md-add">新 建</el-button>
                    </div>
                </el-row>
            </div>
            <el-table
                :data="data"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                default-expand-all
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
                <el-table-column prop="name" label="菜单名称" sortable> </el-table-column>
                <el-table-column label="图标" sortable>
                    <template slot-scope="scope">
                        <i :class="`iconfont ${scope.row.icon}`"></i>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="$router.push(`/system/menu/edit/${scope.row.id}`)">修 改</el-button>
                        <el-button size="small" type="text">删 除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </base-content>
</template>

<script>
// apis
import * as accountApi from 'src/apis/accountApi';
export default {
    name: 'menu-list',
    data() {
        return {
            loading: false,
            keywords: '',
            data: []
        };
    },
    methods: {
        async loadMenuList() {
            const { code, msg, data } = await accountApi.getMenuTree({ keywords: this.keywords }).catch(e => e);
            if (code !== 200) {
                return this.$message.error(msg);
            }
            this.data = data;
        }
    },
    mounted() {
        this.loadMenuList();
    }
};
</script>

<style lang="less">
.menu-list {
}
</style>
