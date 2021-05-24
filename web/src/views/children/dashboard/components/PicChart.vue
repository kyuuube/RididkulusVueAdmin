<template>
    <div :id="id"></div>
</template>

<script>
export default {
    name: 'pic-chart',
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
                { type: '分类一', value: 20 },
                { type: '分类二', value: 18 },
                { type: '分类三', value: 32 },
                { type: '分类四', value: 15 },
                { type: 'Other', value: 15 }
            ];
            // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
            const sliceNumber = 0.01;

            // 自定义 other 的图形，增加两条线
            G2.Shape.registerShape('interval', 'sliceShape', {
                draw(cfg, container) {
                    const points = cfg.points;
                    let path = [];
                    path.push(['M', points[0].x, points[0].y]);
                    path.push(['L', points[1].x, points[1].y - sliceNumber]);
                    path.push(['L', points[2].x, points[2].y - sliceNumber]);
                    path.push(['L', points[3].x, points[3].y]);
                    path.push('Z');
                    path = this.parsePath(path);
                    return container.addShape('path', {
                        attrs: {
                            fill: cfg.color,
                            path
                        }
                    });
                }
            });
            const chart = new G2.Chart({
                container: this.id + '',
                forceFit: true,
                height: 368
            });
            chart.legend(false);
            chart.source(data);
            chart.coord('theta', {
                innerRadius: 0.75
            });
            // 辅助文本
            chart.guide().html({
                position: ['50%', '50%'],
                html:
                    '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">主机<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
                alignX: 'middle',
                alignY: 'middle'
            });
            chart.tooltip({
                showTitle: false
            });
            chart
                .intervalStack()
                .position('value')
                .color('type')
                .shape('sliceShape');

            chart.render();
        });
    }
};
</script>

<style scoped></style>
