<template>
    <base-content search class="article-list">
        <div slot="header">
            <el-breadcrumb>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                <el-breadcrumb-item>文章列表</el-breadcrumb-item>
            </el-breadcrumb>
            <h2>文章管理列表</h2>
        </div>

        <div slot="search">
            <el-form ref="formInline" inline>
                <el-form-item prop="user">
                    <el-input size="small" clearable type="text" v-model="keywords" placeholder="输入关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="loadData">搜 索</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <div class="table-toolbar">
                <el-row type="flex" justify="space-between">
                    <div>查询表格</div>
                    <div>
                        <el-button size="small" @click="$router.push('/article/add')" type="primary" icon="md-add">新 建</el-button>
                    </div>
                </el-row>
            </div>
            <el-table :data="list" style="width: 100%">
                <el-table-column label="文章标题">
                    <template slot-scope="{ row }">
                        <span class="-link" @click="$router.push(`/article/edit/${row.id}`)">{{ row.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="{ row }">
                        {{ row.status | articleStatusFilter }}
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
import * as contentApi from 'src/apis/contentApi';
// filters
import articleStatusFilter from 'src/common/filters/articleStatusFilter';
export default {
    name: 'article-list',
    refresh: 'loadData',
    data() {
        return {
            loading: false,
            keywords: '',
            total: 0,
            page: 1,
            pageSize: 10,
            list: []
        };
    },
    filters: {
        articleStatusFilter: articleStatusFilter
    },
    methods: {
        submit() {},
        async loadData() {
            const payload = {
                keywords: this.keywords,
                page: this.page,
                pageSize: this.pageSize
            };
            this.loading = true;
            const { data, code, message } = await contentApi.getArticleList(payload).catch(e => e);
            this.loading = false;
            if (code !== 200) {
                return this.$message.error(message);
            }
            this.list = data.list;
            this.total = data.totalNum;
        },
        // 变更页数
        pageSizeChange(v) {
            this.pageSize = v;
            this.loadData();
        },
        currentChange(v) {
            this.page = v;
            this.loadData();
        }
    },
    mounted() {
        this.loadData();
    }
};
</script>

<style lang="less">
.article-list {
    .-link {
        color: #1e9fff;
        cursor: pointer;
    }
}
</style>
