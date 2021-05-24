<template>
    <div class="sample-mini-chart-box">
        <mini-chart-box title="搜索用户数" description="指数说明" :count="1067" :increase="18.1">
            <div :id="id"></div>
        </mini-chart-box>
    </div>
</template>

<script>
import MiniChartBox from './MiniChartBox';
import { View } from '@antv/data-set';
import G2 from '@antv/g2';
export default {
    name: 'sample-mini-chart-box2',
    components: { MiniChartBox },
    data() {
        return {
            id: ''
        };
    },
    created() {
        this.id = Date.now();
    },
    mounted() {
        this.$nextTick(() => {
            const data = [
                { year: '1986', ACME: 162 },
                { year: '1987', ACME: 134 },
                { year: '1988', ACME: 116 },
                { year: '1989', ACME: 122 },
                { year: '1990', ACME: 178 },
                { year: '1991', ACME: 144 },
                { year: '1992', ACME: 125 },
                { year: '1993', ACME: 176 },
                { year: '1994', ACME: 156 },
                { year: '1995', ACME: 195 },
                { year: '1996', ACME: 215 },
                { year: '1997', ACME: 176 },
                { year: '1998', ACME: 167 },
                { year: '1999', ACME: 142 },
                { year: '2000', ACME: 117 },
                { year: '2001', ACME: 113 },
                { year: '2002', ACME: 132 },
                { year: '2003', ACME: 146 },
                { year: '2004', ACME: 169 },
                { year: '2005', ACME: 184 }
            ];
            const dv = new View().source(data);
            dv.transform({
                type: 'fold',
                fields: ['ACME'],
                key: 'type',
                value: 'value'
            });
            const chart = new G2.Chart({
                container: this.id + '',
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
                .color('type', ['#5aace4'])
                .shape('smooth');
            chart
                .line()
                .position('year*value')
                .color('type', ['#2378e4'])
                .size(2)
                .shape('smooth');
            chart.render();
        });
    }
};
</script>

<style lang="less">
.sample-mini-chart-box {
}
</style>
