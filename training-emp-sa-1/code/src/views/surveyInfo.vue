<template>
    <div class="survey-info">
      <div class="header-title">
          <h3>问卷信息列表</h3>
      </div>
      <el-scrollbar class="scroll-table" style="height:100%">
        <el-table
        :data="itemList.data">
          <el-table-column
            label="名称"
            prop="name"
            :show-overflow-tooltip="true"
            style='width: 20%'>
          </el-table-column>
          <el-table-column
            label="呈现"
            prop="show"
            style='width: 20%'>
          </el-table-column>
          <el-table-column
            label="类别"
            prop="desc"
            style='width: 20%'>
          </el-table-column>
          <el-table-column
            label="时间"
            style='width: 20%'>
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>创建时间: {{ scope.row.created_at }}</p>
                <p>修改时间: {{ scope.row.updated_at }}</p>
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">时间</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="类别"
            style='width: 20%'>
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" circle
                @click="handleClick(scope.row)"
                plain round>选择</el-button>
                <el-button size="mini" type="primary" circle
                @click="chooseClick(scope.row)"
                plain round>汇总</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <el-row style="margin-top:50px;">
        <el-col :span="24" class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[3, 4, 5, 6, 7, 10]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="itemList.total">
          </el-pagination>
        </el-col>
      </el-row>
      <url-dialog :urlDialogData="urlDialogData"></url-dialog>
    </div>
</template>

<script>
import urlDialog from '@/components/urlDialog';

export default {
  name: 'surveyInfo',
  components: { urlDialog },
  data() {
    return {
      itemList: [],
      urlDialogData: {
        dialogTableVisible: false,
        id: '',
      },
    };
  },
  computed: {
    currentPage() {
      return this.$store.state.surveyPage.currentPage;
    },
    pageSize() {
      return this.$store.state.surveyPage.pageSize;
    },
  },
  mounted() {
    this.handleCurrentChange(1);
  },
  methods: {
    handleSizeChange(val) {
      const pageSize = { pageSize: val };
      this.$store.commit('changeSurveyPage', pageSize);
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange(val) {
      const currentPage = { currentPage: val };
      this.$store.commit('changeSurveyPage', currentPage);
      this.$http.get('api/survey', {
        params: {
          size: this.pageSize,
          page: val,
        },
      }).then((res) => {
        this.itemList = res.data;
      });
    },
    handleClick(row) {
      this.urlDialogData.dialogTableVisible = true;
      this.urlDialogData.id = row.id;
    },
    chooseClick(row) {
      this.$store.dispatch('getSummaryData', { survey_id: row.id });
      this.$router.push({ name: 'summaryInfo' });
    },
  },
};
</script>

<style lang='scss'>
.survey-info {
  @import "../scss/adminTable.scss";
}
.scroll-table .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
