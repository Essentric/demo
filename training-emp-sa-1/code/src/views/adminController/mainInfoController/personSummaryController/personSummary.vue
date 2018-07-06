<template>
    <el-container>
      <el-header class="header">
        <el-button icon="el-icon-arrow-left"
        @click="$router.go(-1)"
        style="float: left;margin:20px 40px 0 0;" circle></el-button>
        <div style="width:80%;margin:auto;">
          <h1 style="float: left;">{{summaryInfoData.survey_name}}</h1>
          <h4 style="float: right;margin-top:30px;">用户：{{summaryInfoData.name}}</h4>
        </div>
      </el-header>
        <el-main style="margin-top:80px;">
            <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <div id="result" style="width:600px;height:400px;margin:50px auto"></div>
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
                    v-for="(item, index) in summaryInfoData.scoreSum"
                    :key="index" class="text item">
                      <el-row style="text-align:center;">
                        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                          {{item.code}}/
                          {{evaluationList.get(item.code)}}
                          </el-col>
                        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                          {{summaryInfoData[item.code]}}
                        </el-col>
                        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">{{item.scoreSum}}</el-col>
                        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6"
                        :class="{blue:item.evaluation=='自然',
                        green:item.evaluation=='次要',
                        red:item.evaluation=='避免'}">{{item.evaluation}}</el-col>
                        <hr/>
                      </el-row>
                    </div>
                  </el-card>
                  <el-card class="box-card" v-if="getEvaluation.length != 0">
                    <div slot="header" class="clearfix">
                      <span class="h2 blue">最后评价</span>
                    </div>
                    <el-row>
                      <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3"
                      v-for="(item, index) in getEvaluation"
                      :key="index">
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
export default {
  name: 'personSummary',
  data() {
    return {
      summaryInfoData: [],
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
    evaluationList() {
      const m = new Map();
      m.set('PL', '智多星');
      m.set('RI', '外联者');
      m.set('CO', '协调者');
      m.set('SH', '鞭策者');
      m.set('ME', '监督者');
      m.set('TW', '凝聚者');
      m.set('IM', '实干者');
      m.set('CF', '善始善终者');
      m.set('SP', '专家');
      return m;
    },
    getEvaluation() {
      const evaluation = [];
      this.summaryInfoData.scoreSum.forEach((element) => {
        if (element.evaluation === '自然') {
          evaluation.push(this.evaluationList.get(element.code));
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
    this.summaryInfoData = JSON.parse(localStorage.getItem('summaryInfoData')).rowData;
    const dataBase = this.summaryInfoData.scoreSum;
    dataBase.forEach((element) => {
      this.options.xAxis.data.push(element.code);
      this.options.series[0].data.push(element.scoreSum);
    });
  },
  mounted() {
    const myChart = this.$echarts.init(document.getElementById('result'));
    myChart.setOption(this.options);
  },
};
</script>

<style scoped>
  .header {
    background-color: #eee;
    height: 80px !important;
    overflow:auto;
    position:fixed;
    left:0;
    right:0;
    z-index: 999;
  }
 .h2 {
   font-size: 18px;
   font-weight: bold;
 }
</style>

