<template>
    <base-content search class="role-list">
        <div slot="header">
            <el-breadcrumb>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
                <el-breadcrumb-item>角色列表</el-breadcrumb-item>
            </el-breadcrumb>
            <h2>角色管理列表</h2>
        </div>

        <div slot="search">
            <el-form ref="formInline" inline>
                <el-form-item prop="user">
                    <el-input size="small" clearable type="text" v-model="keywords" placeholder="输入关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="loadRoleList">搜 索</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <div class="table-toolbar">
                <el-row type="flex" justify="space-between">
                    <div>查询表格</div>
                    <div>
                        <el-button size="small" @click="$router.push('/system/role/add')" type="primary" icon="md-add">新 建</el-button>
                    </div>
                </el-row>
            </div>
            <el-table :data="data" style="width: 100%">
                <el-table-column prop="name" label="角色名称"> </el-table-column>
                <el-table-column prop="description" label="描述"> </el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" @click="$router.push(`/system/role/edit/${scope.row.id}`)" type="text">修 改</el-button>
                        <el-button size="small" type="text">删 除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="pageSizeChange"
                @current-change="currentChange"
                :current-page="page"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
    </base-content>
</template>

<script>
// apis
import * as accountApi from 'src/apis/accountApi';
export default {
    name: 'role-list',
    data() {
        return {
            loading: false,
            keywords: '',
            data: [],
            pageSize: 10,
            page: 1,
            total: 0
        };
    },
    methods: {
        submit() {
            console.info('onsubmit');
        },
        async loadRoleList() {
            const params = {
                keywords: this.keywords,
                page: this.page,
                pageSize: this.pageSize
            };
            const { data, msg, code } = await accountApi.getRoleList(params).catch(e => e);
            if (code !== 200) {
                return this.$message.error(msg);
            }
            this.data = data.list;
            this.total = data.totalNum;
        },
        // 变更页数
        pageSizeChange(v) {
            this.pageSize = v;
            this.loadRoleList();
        },
        currentChange(v) {
            this.page = v;
            this.loadRoleList();
        }
    },
    mounted() {
        this.loadRoleList();
    }
};
</script>
