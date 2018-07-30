<template>
  <div class="result">
    <el-scrollbar style="height:100%">
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
          v-for="(item, index) in resultData"
          :key="index" class="text item">
            <el-row style="text-align:center;">
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                {{item.code}}/
                {{item.desc}}
                </el-col>
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                {{item.score}}
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
    </el-scrollbar>
  </div>
</template>

<script>
import getScore from '@/utils/getScore';

export default {
  name: 'Result',
  data() {
    return {
      resultData: [],
    };
  },
  computed: {
    evaluation() {
      const evaluation = [];
      this.resultData.forEach((element) => {
        if (element.evaluation === '自然' || element.evaluation === '优秀') {
          evaluation.push(`${element.desc}>>>${element.evaluation}`);
        }
      });
      return evaluation;
    },
  },
  created() {
    let data = this.$route.params;
    if (Object.keys(data).length !== 0) {
      localStorage.setItem('resultItem', JSON.stringify(data));
    }
    data = JSON.parse(localStorage.getItem('resultItem'));
    data.forEach((element) => {
      const code = element.code;
      const desc = getScore.getDesc().get(code);
      const sum = getScore.getScoreSum(code, element.score);
      const obj = getScore.getEvaluation(code, sum);
      obj.desc = desc;
      obj.score = element.score;
      this.resultData.push(obj);
    });
  },
  methods: {
    tableRowClassName({ row }) {
      if (row.evaluation === '优秀') {
        return 'success-row';
      } else if (row.evaluation === '自然') {
        return 'primary-row';
      } else if (row.evaluation === '次要') {
        return 'warning-row';
      } else if (row.evaluation === '避免') {
        return 'danger-row';
      }
      return '';
    },
  },
};
</script>

<style lang="scss">
.result {
  @import "../scss/adminTable.scss";
  @import "../scss/common.scss";
    .header {
      background-color: #fff;
      height: 80px !important;
      overflow:auto;
      position:fixed;
      left:0;
      right:0;
      z-index: 999;
      box-shadow: -1px 0 10px #000;
    }
   .h2 {
     font-size: 18px;
     font-weight: bold;
   }
}
</style>
