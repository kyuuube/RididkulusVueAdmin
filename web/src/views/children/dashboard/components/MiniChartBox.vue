<template>
    <div class="mini-chart-box">
        <el-row class="header">
            <span class="title">{{ title }}</span>
            <el-tooltip :content="description">
                <!--                <Icon type="ios-help-circle-outline" size="18" />-->
            </el-tooltip>
        </el-row>
        <el-row>
            <span class="count">{{ count }}</span>
            <span class="increase"
                >{{ increase }}
                <!--                <Icon color="red" type="md-arrow-dropup" size="20" /> -->
            </span>
        </el-row>
        <div class="chart">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mini-chart-box',
    props: {
        title: String,
        description: String,
        count: Number,
        increase: Number
    }
};
</script>

<style lang="less">
.mini-chart-box {
    margin-bottom: 20px;
    .header {
        margin-bottom: 8px;
        .title {
            color: rgba(0, 0, 0, 0.45);
            font-size: 15px;
            line-height: 22px;
            white-space: nowrap;
        }
    }
    .increase {
        margin-right: 0;
        color: rgba(0, 0, 0, 0.45);
        font-size: 15px;
        vertical-align: super;
    }
    .count {
        display: inline-block;
        height: 32px;
        margin-right: 32px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 24px;
        line-height: 32px;
    }
    .chart {
        margin-top: 4px;
        height: 40px;
    }
}
</style>
