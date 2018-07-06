<template>
<div class="summary-info">
  <el-table
    stripe
    :data="infoData"
    style="width: 100%;height:100%;overflow:auto;"
    @cell-dblclick="showInfo">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-row>
            <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4">
              <el-form-item label="试卷类型">
                <span>{{ props.row.desc}}</span>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4">
              <el-form-item label="试卷呈现">
                <span>{{ props.row.show }}</span>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4">
              <el-form-item label="试卷 ID">
                <span>{{ props.row.survey_id }}</span>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4">
              <el-form-item label="用户 ID">
                <span>{{ props.row.staff_id }}</span>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4">
              <el-form-item label="用户性别">
                <span>{{ props.row.sex }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      label="测试 ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="试卷名称"
      :show-overflow-tooltip="true"
      prop="survey_name">
    </el-table-column>
    <el-table-column
      label="测试人员"
      prop="name">
    </el-table-column>
    <el-table-column
      label="工号"
      prop="staff_no">
    </el-table-column>
    <el-table-column label="详情">
      <template slot-scope="scope">
        <el-button
        @click="showInfo(scope.row)"
        type="text">详情&gt;&gt;&gt;</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    style="margin-top:10px;"
    background
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize"
    layout="total, prev, pager, next, jumper"
    :total="summaryData.length">
  </el-pagination>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'summaryInfo',
  data() {
    return {
      infoData: [],
      currentPage: 1,
      pageSize: 5,
    };
  },
  computed: {
    ...mapGetters(['authorization', 'summaryData']),
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
  },
  mounted() {
    this.infoData = this.summaryData.slice(0, 5);
  },
  methods: {
    showInfo(rowData) {
      this.$router.push({
        name: 'personSummary',
        params: {
          rowData,
        },
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      const from = (val - 1) * this.pageSize;
      const to = val * this.pageSize;
      this.infoData = this.summaryData.slice(from, to);
    },
  },
};
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .summary-info {
    position: relative;
    width: 100%;
    height: 100%;
    padding-bottom: 30px;
    box-sizing: border-box;
  }
  .summary-info .el-table::before {
    height: 0;
  }
  .cell {
      text-align: center;
  }
  .el-form--inline .el-form-item__label {
    float: left;
  }
  .demo-table-expand label {
    width: 70%;
  }
  .demo-table-expand .el-form-item {
    width: 100%;
  }
  .evaluation {
    font-size: 14px;
  }
  .evaluation .el-col h3 {
    margin: 0;
  }
  .blue {
    color: #3bd;
  }
  .green {
    color: #3e3;
  }
  .red {
    color: #f55;
  }
</style>
