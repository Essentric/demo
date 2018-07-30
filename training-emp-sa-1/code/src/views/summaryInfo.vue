<template>
<div class="summary-info" v-loading="loading">
  <div class="header-title">
    <h3>问卷汇总列表
      <el-button type="text" size='mini'
      @click="getAllSummaryData">
        查看全部
      </el-button>
    </h3>
  </div>
  <el-scrollbar class="scroll-table" style="height:100%">
    <el-table
      stripe
      :data="itemList"
      style=""
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
  </el-scrollbar>
  <el-row style="margin-top:50px;">
    <el-col :span="24" class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="summaryData.length">
      </el-pagination>
    </el-col>
  </el-row>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'summaryInfo',
  data() {
    return {
      selectWhere: '',
      selectFrom: '',
    };
  },
  computed: {
    ...mapGetters(['authorization', 'summaryData']),
    currentPage() {
      return this.$store.state.summaryPage.currentPage;
    },
    pageSize() {
      return this.$store.state.summaryPage.pageSize;
    },
    loading() {
      return this.$store.state.summaryPage.loading;
    },
    itemList() { // 分页数据储存
      const from = (this.currentPage - 1) * this.pageSize;
      const to = this.currentPage * this.pageSize;
      return this.summaryData.slice(from, to);
    },
  },
  created() { this.$store.dispatch('getSummaryData', this.$route.query); },
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
      const currentPage = { currentPage: val };
      this.$store.commit('changeSummaryPage', currentPage);
    },
    getAllSummaryData() {
      this.$store.dispatch('getSummaryData');
    },
  },
};
</script>

<style lang='scss'>
.summary-info {
  @import "../scss/adminTable.scss";
  .el-input-group__prepend {
    width: 30%;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .scroll-table .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>

