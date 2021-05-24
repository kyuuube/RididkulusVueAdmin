<template>
    <div class="table-list">
        <el-table :data="data" style="width: 100%">
            <el-table-column prop="range" label="排名"> </el-table-column>
            <el-table-column prop="keyword" label="搜索关键词"> </el-table-column>
            <el-table-column prop="number" label="用户数"> </el-table-column>
            <el-table-column prop="increase" label="周涨幅"> </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'table-list',
    data() {
        return {
            data: [
                {
                    keyword: 'John Brown',
                    range: 18,
                    number: 12,
                    increase: '16'
                },
                {
                    keyword: 'Jim Green',
                    range: 24,
                    number: 12,
                    increase: '1'
                },
                {
                    keyword: 'Joe Black',
                    range: 30,
                    number: 12,
                    increase: '20'
                },
                {
                    keyword: 'Jon Snow',
                    range: 26,
                    number: 12,
                    increase: '4'
                },
                {
                    keyword: 'Jon Snow',
                    range: 26,
                    number: 12,
                    increase: '4'
                },
                {
                    keyword: 'Joe Black',
                    range: 30,
                    number: 12,
                    increase: '20'
                }
            ]
        };
    }
};
</script>

<style lang="less">
.table-list {
    .table-list-page {
        margin-top: 10px;
        text-align: right;
    }
}
.blue {
    color: #1890ff;
}
</style>
