<template>
    <div class="layout-base-content">
        <div class="content-header">
            <slot name="header"></slot>
        </div>

        <div v-if="search" class="search">
            <slot name="search"></slot>
        </div>

        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'layout-base-content',
    props: {
        search: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {};
    }
};
</script>

<style lang="less">
.layout-base-content {
    display: flex;
    flex-direction: column;
    background-color: #f0f2f5;
    .content-header {
        flex-shrink: 0;
        padding: 12px 18px 8px 18px;
        background-color: #ffffff;
        h2 {
            display: block;
            margin-bottom: 0;
            padding-right: 12px;
            color: rgba(0, 0, 0, 0.85);
            font-weight: 600;
            font-size: 20px;
            line-height: 36px;
        }
    }
    .search {
        background-color: #ffffff;
        margin: 20px 20px 0 20px;
        padding: 10px;
    }
    .content {
        display: block;
        flex: 1;
        flex-basis: auto;
        overflow: auto;
        /*position: relative;*/
        background-color: #ffffff;
        margin: 20px;
        padding: 15px;
        .table-toolbar {
            color: #000c17;
            font-size: 16px;
            padding: 0 0 10px 0;
            line-height: 32px;
        }
    }
    .el-form-item {
        margin-bottom: 4px !important;
    }
    .el-pagination {
        margin-top: 10px;
    }

    .el-table table th {
        background-color: rgba(248, 248, 248, 1);
        color: #000;
        font-weight: 300;
        padding: 8px;
    }

    .el-table {
        margin-top: 10px;
    }
}
</style>
