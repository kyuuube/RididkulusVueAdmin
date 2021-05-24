<template>
    <div class="info-card">
        <div class="info-card-title">
            <el-row type="flex" justify="space-between">
                <div>{{ name }}</div>
                <div>
                    <el-tooltip :content="tooltip">
                        <i class="el-icon-warning-outline"></i>
                    </el-tooltip>
                </div>
            </el-row>
        </div>
        <div class="number">{{ number }}</div>
        <div style="min-height: 46px">
            <slot></slot>
        </div>
        <el-divider></el-divider>
        <span>日访问量 {{ total }}</span>
    </div>
</template>

<script>
export default {
    name: 'base-card-chart-warp',
    props: {
        name: String,
        tooltip: String,
        number: Number | String,
        total: Number
    }
};
</script>

<style lang="less">
.info-card {
    cursor: pointer;
    background-color: #ffffff;
    padding: 18px 18px 8px;
    .info-card-title {
    }
    .number {
        color: rgba(0, 0, 0, 0.85);
        font-size: 30px;
        line-height: 38px;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
    }
    .el-divider {
        margin: 12px 0;
    }
}
</style>
