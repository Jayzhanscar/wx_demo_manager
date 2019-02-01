<template>
    <section class="chart-container">
        <el-row>
            <!--<el-col :span="6">-->
                <!--<el-card class="box-card"  shadow="never">-->
                    <!--&lt;!&ndash;<div v-for="o in 4" :key="o" class="text item">&ndash;&gt;-->
                        <!--&lt;!&ndash;{{'列表内容123456hgfdsadfg ' + o }}&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--<div  class="text item">-->
                        <!--<span style="color: #5e7382; font-size:20px;">商品总销售额 </span>-->
                        <!--<span style="color: #1d90e6"> 200 RMB</span>-->
                    <!--</div>-->
                    <!--<div  class="text item">-->
                        <!--<span style="color: #5e7382; font-size:20px;">课程总销售额 </span>-->
                        <!--<span style="color: #13ce66"> 200 RMB</span>-->
                    <!--</div>-->
                    <!--<div   class="text item">-->
                        <!--<span style="color: #5e7382; font-size:20px;">砍价总销售额 </span>-->
                        <!--<span style="color: #e64242"> 200 RMB</span>-->
                    <!--</div>-->
                    <!--<div  class="text item">-->
                        <!--<span style="color: #5e7382; font-size:20px;">拼团总销售额 </span>-->
                        <!--<span style="color: palevioletred"> 200 RMB</span>-->
                    <!--</div>-->
                <!--</el-card>-->

            <!--</el-col>-->
            <el-col :span="12">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div><span style="font-size: 18px;color: #4db3ff">日销售额</span> | <span style="color: #e64242;font-size: 16px;">{{manageData.goods_price_day + manageData.curr_price_day+ manageData.bargain_price_day+ manageData.ass_price_day}} </span></div>
                <div><span style="font-size: 18px;color: gray">商品日销售额</span> | <span style="color: #e64242;font-size: 16px;">{{ manageData.goods_price_day}} </span></div>
                <div><span style="font-size: 18px;color: teal">课程日销售额</span> | <span style="color: #e64242;font-size: 16px;">{{ manageData.curr_price_day}}</span></div>
                <div><span style="font-size: 18px;color: peru">砍价活动日销售额</span> | <span style="color: #e64242;font-size: 16px;">{{ manageData.bargain_price_day}}</span></div>
                <div><span style="font-size: 18px;color: olive">拼团活动日销售额</span> | <span style="color: #e64242;font-size: 16px;">{{ manageData.ass_price_day}}</span></div>
                <div style="border-bottom:1px solid silver; margin-top: 30px"></div>

                <div style="margin-top: 30px;"><span style="font-size: 18px;color: olive; margin-top: 20px;">海报下载量</span> | <span style="color: #e64242;font-size: 16px;">{{ manageData.poster_download}}</span></div>
                <div><span style="font-size: 18px;color: olive">日活用户</span> | <span style="color: #e64242;font-size: 16px;">{{ manageData.day_user}}</span></div>
                <div><span style="font-size: 18px;color: olive">注册用户</span> | <span style="color: #e64242;font-size: 16px;">{{ manageData.user_num}}</span></div>
                <div><span style="font-size: 18px;color: olive">会员用户</span> | <span style="color: #e64242;font-size: 16px;">{{ manageData.vip_user_num}}</span></div>



                <div style="border-bottom:1px solid silver; margin-top: 30px"></div>

            </el-col>
            <el-col :span="12">
                <div><span style="font-size: 18px;color: #4db3ff">总销售额</span> | <span style="color: #e64242;font-size: 16px;">{{ manageData.sum_price}}</span></div>
                <div><span style="font-size: 18px;color: gray">商品总销售额</span> | <span style="color: #e64242;font-size: 16px;">{{ manageData.goods_price}}</span></div>
                <div><span style="font-size: 18px;color: teal">课程总销售额</span> | <span style="color: #e64242;font-size: 16px;">{{ manageData.curr_price}}</span></div>
                <div><span style="font-size: 18px;color: peru">砍价活动总销售额</span> | <span style="color: #e64242;font-size: 16px;">{{ manageData.bargain_price}}</span></div>
                <div><span style="font-size: 18px;color: olive">拼团活动总销售额</span> | <span style="color: #e64242;font-size: 16px;">{{ manageData.ass_price}}</span></div>

            </el-col>
            <!--<el-col :span="8">-->
                <!--<div id="chartColumn" style="width:80%; height:400px;"></div>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
                <!--<div id="chartBar" style="width:100%; height:400px;"></div>-->
            <!--</el-col>-->
            <!--<el-col :span="12">-->
                <!--<div id="chartLine" style="width:100%; height:400px;"></div>-->
            <!--</el-col>-->

            <!--<el-col :span="24">-->
                <!--<a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>-->
            <!--</el-col>-->
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import service from '../../api/service.js'
    export default {
        data() {
            return {
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null,
                manageData: '',
            }
        },

        methods: {
            getDate: function(){
                const success = data => {
                    this.manageData = data
                }
                service.getSaleDate('data', success)
            },
            // drawColumnChart() {
            //     this.chartColumn = echarts.init(document.getElementById('chartColumn'));
            //     this.chartColumn.setOption({
            //         title: { text: 'Column Chart' },
            //         tooltip: {},
            //         xAxis: {
            //             data: ["商品", "课程", "砍价", "拼团"]
            //         },
            //         yAxis: {},
            //         series: [{
            //             name: '销量',
            //             type: 'bar',
            //             data: [5, 20, 36, 10, 10]
            //         }]
            //     });
            // },
            // drawBarChart() {
            //     this.chartBar = echarts.init(document.getElementById('chartBar'));
            //     this.chartBar.setOption({
            //         title: {
            //             text: 'Bar Chart',
            //             subtext: '数据来自网络'
            //         },
            //         tooltip: {
            //             trigger: 'axis',
            //             axisPointer: {
            //                 type: 'shadow'
            //             }
            //         },
            //         legend: {
            //             data: ['2011年', '2012年']
            //         },
            //         grid: {
            //             left: '3%',
            //             right: '4%',
            //             bottom: '3%',
            //             containLabel: true
            //         },
            //         xAxis: {
            //             type: 'value',
            //             boundaryGap: [0, 0.01]
            //         },
            //         yAxis: {
            //             type: 'category',
            //             data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
            //         },
            //         series: [
            //             {
            //                 name: '2011年',
            //                 type: 'bar',
            //                 data: [18203, 23489, 29034, 104970, 131744, 630230]
            //             },
            //             {
            //                 name: '2012年',
            //                 type: 'bar',
            //                 data: [19325, 23438, 31000, 121594, 134141, 681807]
            //             }
            //         ]
            //     });
            // },
            // drawLineChart() {
            //     this.chartLine = echarts.init(document.getElementById('chartLine'));
            //     this.chartLine.setOption({
            //         title: {
            //             text: 'Line Chart'
            //         },
            //         tooltip: {
            //             trigger: 'axis'
            //         },
            //         legend: {
            //             data: ['邮件营销', '联盟广告', '搜索引擎']
            //         },
            //         grid: {
            //             left: '3%',
            //             right: '4%',
            //             bottom: '3%',
            //             containLabel: true
            //         },
            //         xAxis: {
            //             type: 'category',
            //             boundaryGap: false,
            //             data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            //         },
            //         yAxis: {
            //             type: 'value'
            //         },
            //         series: [
            //             {
            //                 name: '邮件营销',
            //                 type: 'line',
            //                 stack: '总量',
            //                 data: [120, 132, 101, 134, 90, 230, 210]
            //             },
            //             {
            //                 name: '联盟广告',
            //                 type: 'line',
            //                 stack: '总量',
            //                 data: [220, 182, 191, 234, 290, 330, 310]
            //             },
            //             {
            //                 name: '搜索引擎',
            //                 type: 'line',
            //                 stack: '总量',
            //                 data: [820, 932, 901, 934, 1290, 1330, 1320]
            //             }
            //         ]
            //     });
            // },
            drawPieChart() {
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title: {
                        text: '一茗设计',
                        subtext: '销售金额统计(单位：RMB)',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['商品', '课程', '拼团', '砍价', '会员充值']
                    },
                    series: [
                        {
                            name: '销售金额',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                { value: this.manageData.goods_price, name: '商品' },
                                { value: this.manageData.curr_price, name: '课程' },
                                { value: this.manageData.ass_price, name: '拼团' },
                                { value: this.manageData.bargain_price, name: '砍价' },
                                { value: this.manageData.member_price, name: '会员充值' },
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            drawCharts() {
                // this.drawColumnChart()
                // this.drawBarChart()
                // this.drawLineChart()
                this.drawPieChart()
            },
        },

        mounted: function () {
            this.drawCharts()
            this.getDate()
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .text {
        font-size: 16px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 280px;
        height: 400px;

    }
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
