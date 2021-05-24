<template>
    <base-content search class="authority-list">
        <div slot="header">
            <el-breadcrumb>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>权限列表</el-breadcrumb-item>
            </el-breadcrumb>
            <h2>权限管理列表</h2>
        </div>

        <div slot="search">
            <el-form ref="formInline" inline>
                <el-form-item prop="user">
                    <el-input size="small" clearable type="text" v-model="keywords" placeholder="输入关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="loadAuthorityList">搜 索</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <div class="table-toolbar">
                <el-row type="flex" justify="space-between">
                    <div>查询表格</div>
                    <div>
                        <el-button size="small" @click="showDialog = true" type="primary" icon="md-add">新 建</el-button>
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
                <el-table-column prop="name" label="权限名称" sortable> </el-table-column>
                <el-table-column prop="slug" label="标识" sortable> </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="$router.push(`/system/menu/edit/${scope.row.id}`)">修 改</el-button>
                        <el-button size="small" type="text">删 除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <modify-dialog v-model="showDialog"></modify-dialog>
    </base-content>
</template>

<script>
// apis
import * as accountApi from 'src/apis/accountApi';
// components
import ModifyDialog from './components/ModifyDialog';
export default {
    name: 'authority-list',
    components: {
        ModifyDialog
    },
    data() {
        return {
            showDialog: false,
            loading: false,
            keywords: '',
            total: 0,
            page: 1,
            pageSize: 10,
            data: []
        };
    },
    methods: {
        async loadAuthorityList() {
            const params = {
                keywords: this.keywords,
                page: this.page,
                pageSize: this.pageSize
            };
            this.loading = true;
            const { code, data, msg } = await accountApi.getAuthorityList(params).catch(e => e);
            this.loading = false;
            if (code !== 200) {
                return this.$message.error(msg);
            }
            this.data = data.list;
            this.total = data.totalNum;
        },
        // 变更页数
        pageSizeChange(v) {
            this.pageSize = v;
            this.loadAuthorityList();
        }
    },
    mounted() {
        this.loadAuthorityList();
    }
};
</script>

<style lang="less">
.authority-list {
}
</style>
