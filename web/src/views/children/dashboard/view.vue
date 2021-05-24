<template>
    <div class="dashboard">
        <el-row :gutter="25">
            <el-col :span="6">
                <count-sales></count-sales>
            </el-col>
            <el-col :span="6">
                <page-view-chart></page-view-chart>
            </el-col>
            <el-col :span="6">
                <page-view-line-chart-small></page-view-line-chart-small>
            </el-col>
            <el-col :span="6">
                <mini-progress></mini-progress>
            </el-col>
        </el-row>
        <div class="dashboard-page-view-line">
            <div class="date-range">
                <el-date-picker
                    size="mini"
                    v-model="range"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                >
                </el-date-picker>
            </div>
            <el-tabs v-model="tabType">
                <el-tab-pane label="销售额" name="name1">
                    <el-row type="flex">
                        <el-col :span="17">
                            <div class="page-view-line-chart-warp">
                                <h4>销售趋势</h4>
                                <page-view-line-chart></page-view-line-chart>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="ranking-list-warp">
                                <h4>门店销售额排名</h4>
                                <ul class="dashboard-ranking-List">
                                    <li :key="i" v-for="i in 7">
                                        <span class="ranking-item-order">{{ i }}</span
                                        ><span class="ranking-item-title">工专路 {{ i }} 号店</span><span>323,234</span>
                                    </li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="访问量" name="name2"> </el-tab-pane>
            </el-tabs>
        </div>
        <el-row type="flex" class="el-row-warp" :gutter="25">
            <el-col :span="12">
                <base-dashboard-card title="线上热门搜索">
                    <el-dropdown slot="extra" placement="bottom-start">
                        <i class="el-icon-more-outline"></i>
                        <el-dropdown-menu>
                            <el-dropdown-item>操作一</el-dropdown-item>
                            <el-dropdown-item>操作一</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-row>
                        <el-col :span="12">
                            <sample-mini-chart-box></sample-mini-chart-box>
                        </el-col>
                        <el-col :span="12">
                            <sample-mini-chart-box2></sample-mini-chart-box2>
                        </el-col>
                    </el-row>
                    <table-list></table-list>
                </base-dashboard-card>
            </el-col>
            <el-col :span="12">
                <base-dashboard-card title="销售额类别占比">
                    <el-row class="dashboard-card-header"><h4>销售额</h4></el-row>
                    <el-row :gutter="15">
                        <el-col :span="16"><pic-chart></pic-chart></el-col>
                        <el-col :span="8">
                            <ul class="dashboard-pie-chart-ul">
                                <li>
                                    <span class="pie-chart-list-dot" style="background-el-color: rgb(240, 72, 100);"></span>
                                    <span>家用电器</span>
                                    <span>28.56%</span>
                                    <span>¥ 4,544</span>
                                </li>
                                <li>
                                    <span class="pie-chart-list-dot" style="background-el-color: rgb(24, 144, 255);"></span>
                                    <span>家用电器</span>
                                    <span>28.56%</span>
                                    <span>¥ 4,544</span>
                                </li>
                                <li>
                                    <span class="pie-chart-list-dot" style="background-el-color: rgb(19, 194, 194);"></span>
                                    <span>家用电器</span>
                                    <span>28.56%</span>
                                    <span>¥ 4,544</span>
                                </li>
                                <li>
                                    <span class="pie-chart-list-dot" style="background-el-color: rgb(47, 194, 91);"></span>
                                    <span>家用电器</span>
                                    <span>28.56%</span>
                                    <span>¥ 4,544</span>
                                </li>
                                <li>
                                    <span class="pie-chart-list-dot" style="background-el-color: rgb(250, 204, 20);"></span>
                                    <span>家用电器</span>
                                    <span>28.56%</span>
                                    <span>¥ 4,544</span>
                                </li>
                            </ul>
                        </el-col>
                    </el-row>
                </base-dashboard-card>
            </el-col>
        </el-row>
        <bottom-line-chart></bottom-line-chart>
    </div>
</template>

<script>
// components
import PageViewChart from './components/PageViewChart';
import PageViewLineChart from './components/PageViewLineChart';
import CountSales from './components/CountSales';
import PageViewLineChartSmall from './components/PageViewLineChartSmall';
import BaseDashboardCard from './components/BaseDashboardCard';
import MiniProgress from './components/MiniProgress';
import PicChart from './components/PicChart';
import TableList from './components/TableList';
import SampleMiniChartBox from './components/SampleMiniChartBox';
import SampleMiniChartBox2 from './components/SampleMiniChartBox2';
import BottomLineChart from './components/BottomLineChart';
export default {
    name: 'dashboard',
    components: {
        PageViewChart,
        PageViewLineChart,
        CountSales,
        PageViewLineChartSmall,
        MiniProgress,
        BaseDashboardCard,
        PicChart,
        TableList,
        SampleMiniChartBox,
        SampleMiniChartBox2,
        BottomLineChart
    },
    data() {
        return {
            tabType: 'name1',
            range: ''
        };
    }
};
</script>

<style lang="less">
.dashboard {
    padding: 16px;
    .el-tabs {
        background-color: #ffffff;
    }
    .el-card {
        border: none;
    }
    .el-card__header {
        padding: 0 14px;
    }
    .dashboard-page-view-line {
        position: relative;
        margin-top: 25px;
        background-color: #ffffff;
        padding: 0 10px;
        .date-range {
            position: absolute;
            right: 10px;
            top: 5px;
            z-index: 2000;
        }
        .page-view-line-chart-warp {
            h4 {
                margin-left: 20px;
            }
        }
        .ranking-list-warp {
            padding: 0 32px 32px 52px;
        }
        .dashboard-ranking-List {
            margin: 25px 0 0;
            padding: 0;
            list-style: none;
            li {
                display: flex;
                align-items: center;
                margin-top: 16px;
                zoom: 1;
                span {
                    color: rgba(0, 0, 0, 0.65);
                    font-size: 14px;
                    line-height: 22px;
                }
                .ranking-item-title {
                    flex: 1 1;
                    margin-right: 8px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .ranking-item-order {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    margin-top: 1.5px;
                    margin-right: 16px;
                    font-weight: 600;
                    font-size: 12px;
                    line-height: 20px;
                    text-align: center;
                    background-color: #fafafa;
                    border-radius: 20px;
                }
            }
        }
    }
    .el-row-warp {
        margin-top: 25px;
    }
    .pie-chart-list-dot {
        position: relative;
        top: -1px;
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 8px;
        border-radius: 8px;
    }
    .dashboard-card-header {
        margin-top: 8px;
        margin-bottom: 60px;
    }
    .dashboard-pie-chart-ul {
        /*position: absolute;*/
        /*top: 50%;*/
        /*right: 0px;*/
        min-width: 200px;
        /*transform: translateY(-50%);*/
        margin: 24px 0;
        padding: 0px;
        list-style: none;
        li {
            height: 22px;
            margin-bottom: 16px;
            line-height: 22px;
            cursor: pointer;
        }
    }
}
</style>
