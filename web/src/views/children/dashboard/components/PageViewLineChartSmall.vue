<template>
    <base-card-chart-warp class="count-sales" name="支付笔数" tooltip="支付笔数" number="6,560" :total="22343">
        <div :id="id"></div>
    </base-card-chart-warp>
</template>

<script>
// components
import BaseCardChartWarp from './BaseCardChartWarp';
export default {
    name: 'page-view-line-chart-samll',
    components: {
        BaseCardChartWarp
    },
    data() {
        return {
            id: ''
        };
    },
    created() {
        this.id = Date.now() + '';
    },
    mounted() {
        this.$nextTick(() => {
            const data = [
                { month: '1月', sales: 938 },
                { month: '2月', sales: 1052 },
                { month: '3月', sales: 601 },
                { month: '4月', sales: 1145 },
                { month: '5月', sales: 1248 },
                { month: '6月', sales: 1138 },
                { month: '7月', sales: 338 },
                { month: '8月', sales: 838 },
                { month: '9月', sales: 438 },
                { month: '10月', sales: 638 },
                { month: '11月', sales: 838 },
                { month: '12月', sales: 381 }
            ];
            const chart = new G2.Chart({
                container: this.id + '',
                forceFit: true,
                height: 40,
                padding: [0, 0, 0, 0]
            });
            chart.source(data, {
                sales: {
                    tickCount: 2
                },
                month: {
                    tickCount: 1
                }
            });
            chart.scale('sales', {
                tickInterval: 1000
            });
            chart.interval().position('month*sales');
            chart.render();
        });
    }
};
</script>

<style scoped></style>
