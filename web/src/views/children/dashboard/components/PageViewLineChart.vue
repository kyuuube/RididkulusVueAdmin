<template>
    <div :id="id"></div>
</template>

<script>
export default {
    name: 'page-view-line-chart',
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
                height: 288,
                padding: [34, 40, 30, 60]
            });
            chart.source(data);
            chart.scale('sales', {
                tickInterval: 200
            });
            chart.interval().position('month*sales');
            chart.render();
        });
    }
};
</script>

<style scoped></style>
