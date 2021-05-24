<template>
    <base-content search class="user-list">
        <div slot="header">
            <el-breadcrumb>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
            <h2>用户管理列表</h2>
        </div>

        <div slot="search">
            <el-form ref="formInline" inline>
                <el-form-item prop="user">
                    <el-input
                        size="small"
                        clearable
                        type="text"
                        v-model="keywords"
                        placeholder="输入关键字"
                        @keypress.enter.native="loadUserList"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="loadUserList">搜 索</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <div class="table-toolbar">
                <el-row type="flex" justify="space-between">
                    <div>查询表格</div>
                    <div>
                        <el-button @click="$router.push('/system/user/add')" type="primary" size="small" icon="md-add">新 建</el-button>
                    </div>
                </el-row>
            </div>
            <el-table :data="data" style="width: 100%">
                <el-table-column prop="name" label="姓名"> </el-table-column>
                <el-table-column prop="gender" label="性别"> </el-table-column>
                <el-table-column prop="avatar" label="头像">
                    <template slot-scope="scope">
                        <div class="img-warp">
                            <img :src="scope.row.avatar" alt="" class="avatar-img" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" @click="$router.push(`/system/user/edit/${scope.row.id}`)" type="text">修 改</el-button>
                        <el-button size="small" @click="deleteUser(scope.row.id)" type="text">删 除</el-button>
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
// api
import * as accountApi from 'src/apis/accountApi';
// filters
import genderFilter from 'src/common/filters/genderFilter';
export default {
    name: 'user-list',
    data() {
        return {
            loading: false,
            keywords: '',
            total: 0,
            page: 1,
            pageSize: 10,
            data: []
        };
    },
    filters: {
        genderFilter: genderFilter
    },
    methods: {
        // 加载列表数据
        async loadUserList() {
            const params = {
                keywords: this.keywords,
                page: this.page,
                pageSize: this.pageSize
            };
            this.loading = true;
            const { data, code, msg } = await accountApi.getUserList(params).catch(e => e);
            this.loading = false;
            if (code !== 200) {
                return this.$message.error(msg);
            }
            this.data = data.list;
            this.total = data.totalNum;
        },
        // 删除用户
        async deleteUser(id) {
            const confirm = await this.$confirm('是否删除该用户 ?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            })
                .then(() => true)
                .catch(() => false);
            if (!confirm) {
                return;
            }

            const { code, msg } = await accountApi.delUser(id).catch(e => e);
            if (code !== 200) {
                return this.$Message.error(msg);
            }
            this.$message.success('删除成功');
            this.loadUserList();
        },
        // 变更页数
        pageSizeChange(v) {
            this.pageSize = v;
            this.loadUserList();
        },
        currentChange(v) {
            this.page = v;
            this.loadRoleList();
        }
    },
    mounted() {
        this.loadUserList();
    }
};
</script>

<style lang="less">
.user-list {
    .img-warp {
        width: 56px;
        height: 56px;
        .avatar-img {
            margin: 4px auto;
            width: 48px;
            height: 48px;
        }
    }
}
</style>
