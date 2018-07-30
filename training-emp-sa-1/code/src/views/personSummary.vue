<template>
    <el-container>
      <el-header class="header">
        <el-row style="height: 100%;text-align:center">
          <el-col :span="12" style="height: 100%;">
            <el-row style="height:100%">
              <el-col :span="4" style="height:100%">
                <el-button icon="el-icon-arrow-left"
                @click="$router.go(-1)" circle></el-button>
              </el-col>
              <el-col :span="20" style="height:100%">
                <!-- <div style="width:80%;margin:auto;"> -->
                  <span style="font-size:20px">{{itemList.survey_name}}</span>
                  <!-- <h4 style="float: right;margin-top:30px;">用户：{{itemList.name}}</h4> -->
                <!-- </div> -->
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" style="height:100%">
            <div style="height:100%">
              <span>用户：<span style="color:#ffd04b;">{{itemList.name}}</span></span>
            </div>
          </el-col>
        </el-row>
      </el-header>
        <el-main style="margin-top:60px;">
            <el-row style="box-sizing:content-box">
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <div ref="result" style="width:600px;height:400px;margin:50px auto"></div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span class="h2 blue">分数信息</span>
                    </div>
                    <el-row
                    style="text-align:center;
                    font-size:18px;
                    font-weight:bold;
                    margin-bottom:10px;">
                      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">类型</el-col>
                      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">分数</el-col>
                      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">对应分值</el-col>
                      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">评价</el-col>
                    </el-row>
                    <div
                    v-for="(item, index) in itemList.scoreSum"
                    :key="index" class="text item">
                      <el-row style="text-align:center;">
                        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                          {{item.code}}/
                          {{getDesc.get(item.code)}}
                          </el-col>
                        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                          {{itemList[item.code]}}
                        </el-col>
                        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">{{item.scoreSum}}</el-col>
                        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"
                        :class="{blue:item.evaluation=='自然',
                        green:item.evaluation=='次要',
                        red:item.evaluation=='避免',
                        pur:item.evaluation=='优秀'}">{{item.evaluation}}</el-col>
                        <hr/>
                      </el-row>
                    </div>
                  </el-card>
                  <el-card class="box-card" v-if="evaluation.length != 0">
                    <div slot="header" class="clearfix">
                      <span class="h2 blue">最后评价</span>
                    </div>
                    <el-row>
                      <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3"
                      v-for="(item, index) in evaluation"
                      :key="index"
                      :class="{blue:item.includes('自然'),
                        green:item.includes('次要'),
                        red:item.includes('避免'),
                        pur:item.includes('优秀')}">
                        {{item}}
                      </el-col>
                    </el-row>
                  </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import getScore from '@/utils/getScore';

const echarts = require('echarts/lib/echarts'); // 引入基本模板
// 引入饼状图组件
require('echarts/lib/chart/bar');
// 引入提示框
require('echarts/lib/component/tooltip');

export default {
  name: 'personSummary',
  data() {
    return {
      itemList: [],
      options: {
        color: ['#3398DB'],
        title: {
          text: '个人分值统计图 ',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {},
        series: [
          {
            name: '分数',
            type: 'bar',
            data: [],
          },
        ],
      },
    };
  },
  computed: {
    getDesc() {
      return getScore.getDesc();
    },
    evaluation() {
      const evaluation = [];
      this.itemList.scoreSum.forEach((element) => {
        if (element.evaluation === '自然' || element.evaluation === '优秀') {
          evaluation.push(`${this.getDesc.get(element.code)}>>>${element.evaluation}`);
        }
      });
      return evaluation;
    },
  },
  created() {
    const data = this.$route.params;
    if (Object.keys(data).length !== 0) {
      localStorage.setItem('summaryInfoData', JSON.stringify(data));
    }
    this.itemList = JSON.parse(localStorage.getItem('summaryInfoData')).rowData;
    const dataBase = this.itemList.scoreSum;
    dataBase.forEach((element) => {
      this.options.xAxis.data.push(element.code);
      this.options.series[0].data.push(element.scoreSum);
    });
  },
  mounted() {
    const myChart = echarts.init(this.$refs.result);
    myChart.setOption(this.options);
  },
};
</script>

<style scoped>
@import "../scss/common.scss";
  .header {
    background-color: #0E90D2;
    height: 60px !important;
    line-height: 60px;
    overflow: hidden;
    color: #fff;
    position:fixed;
    left:0;
    right:0;
    z-index: 999;
    box-shadow: -1px 0 10px #000;
      /* .header {
    background-color: #0E90D2;
    height: 60px !important;
    line-height: 60px;
    overflow:auto;
    position:fixed;
    left:0;
    right:0;
    z-index: 999;
    color: #fff;
    overflow: hidden;
  } */
  }
 .h2 {
   font-size: 18px;
   font-weight: bold;
 }
</style>

