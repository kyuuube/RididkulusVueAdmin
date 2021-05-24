<template>
    <div>
        <base-card-chart-warp name="访问量" tooltip="主页访问量" :number="8000" :total="22343">
            <div :id="id"></div>
        </base-card-chart-warp>
    </div>
</template>

<script>
// components
import BaseCardChartWarp from './BaseCardChartWarp';
import { View } from '@antv/data-set';
import G2 from '@antv/g2';
export default {
    name: 'page-view-chart',
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
                { year: '1986', Compitor: 42 },
                { year: '1987', Compitor: 54 },
                { year: '1988', Compitor: 26 },
                { year: '1989', Compitor: 32 },
                { year: '1990', Compitor: 68 },
                { year: '1991', Compitor: 54 },
                { year: '1992', Compitor: 35 },
                { year: '1993', Compitor: 66 }
            ];
            const dv = new View().source(data);
            dv.transform({
                type: 'fold',
                fields: ['Compitor'],
                key: 'type',
                value: 'value'
            });
            const chart = new G2.Chart({
                container: this.id,
                forceFit: true,
                height: 40,
                padding: [0, 0, 0, 0]
            });
            chart.source(dv, {
                value: {
                    tickCount: 2
                },
                year: {
                    tickCount: 1
                }
            });
            chart
                .area()
                .position('year*value')
                .color('type', ['#975fe4'])
                .shape('smooth');
            chart
                .line()
                .position('year*value')
                .color('type', ['#975fe4'])
                .size(2)
                .shape('smooth');
            chart.render();
        });
    }
};
</script>

<style scoped></style>
