<template>
    <base-card-chart-warp class="mini-progress" name="总销售额" tooltip="总销售额" number="¥ 126,560" :total="22343">
        <el-progress
            class="mini-progress-stroke"
            :text-inside="true"
            :stroke-width="24"
            :percentage="80"
            :color="customColors"
        ></el-progress>
    </base-card-chart-warp>
</template>

<script>
// components
import BaseCardChartWarp from './BaseCardChartWarp';
export default {
    name: 'mini-progress',
    components: {
        BaseCardChartWarp
    },
    data() {
        return {
            customColors: [
                { color: '#f56c6c', percentage: 20 },
                { color: '#e6a23c', percentage: 40 },
                { color: '#5cb87a', percentage: 60 },
                { color: '#1989fa', percentage: 80 },
                { color: '#6f7ad3', percentage: 100 }
            ]
        };
    }
};
</script>

<style lang="less">
.mini-progress {
    .mini-progress-stroke {
        line-height: 40px;
    }
}
</style>
