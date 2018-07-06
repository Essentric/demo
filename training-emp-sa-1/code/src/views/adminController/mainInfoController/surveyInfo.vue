<template>
    <div class="survey-info">
      <div class="header-title">
          <h3>问卷信息列表</h3>
      </div>
      <div class="container">
          <el-table
          :data="tableData.data">
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
                <el-button size="mini" type="primary"
                @click="handleClick(scope.row)"
                plain round>选择</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              :page-sizes="[3, 4, 5, 6, 7]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.total">
            </el-pagination>
          </div>
      </div>
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
      currentPage: 1,
      tableData: [],
      urlDialogData: {
        dialogTableVisible: false,
        id: '',
      },
      pageSize: 5,
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$http.get('api/survey', {
        params: {
          size: this.pageSize,
          page: val,
        },
      }).then((res) => {
        this.tableData = res.data;
      });
    },
    getTableData() {
      this.$http.get('api/survey', {
        params: {
          size: this.pageSize,
        },
      }).then((res) => {
        this.tableData = res.data;
      });
    },
    handleClick(row) {
      this.urlDialogData.dialogTableVisible = true;
      this.urlDialogData.id = row.id;
    },
  },
};
</script>

<style>
.survey-info {
    width: 100%;
    height: 100%;
    overflow: auto;
}
.cell {
    text-align: center;
}
.block {
  margin-top: 2em;
}
</style>
