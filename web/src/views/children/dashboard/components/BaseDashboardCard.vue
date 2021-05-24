<template>
    <el-card class="base-dashboard-card" shadow="never">
        <div slot="header" class="base-dashboard-card-header">
            <el-row type="flex" justify="space-between">
                <div>{{ title }}</div>
                <div>
                    <slot name="extra"></slot>
                </div>
            </el-row>
        </div>
        <div class="card-warp">
            <slot></slot>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'base-dashboard-card',
    props: {
        title: String
    }
};
</script>

<style lang="less">
.base-dashboard-card {
    .base-dashboard-card-header {
        line-height: 53px;
    }
    .card-warp {
        min-height: 487px;
    }
}
</style>
