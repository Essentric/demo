<template>
  <el-container>
    <el-header>
      header
    </el-header>
    <el-main>
      <el-row type="flex" class="content">
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus" @click="handleAddClick">新增</el-button>
          </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="16">
              <el-input v-model="field" placeholder="请输入搜索内容"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="info" icon="el-icon-search" @click="handleSearch">查找</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-table
        :data="this.$store.getters.filterPersonData"
        highlight-current-row>
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          property="loginName"
          label="登录名">
        </el-table-column>
        <el-table-column
          property="userName"
          label="姓名">
        </el-table-column>
        <el-table-column
          property="post"
          label="职位">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <operate-dialog></operate-dialog>
  </el-container>
</template>

<script>
import operateDialog from '@/components/operateDialog'
export default {
  name: 'index',
  components: { operateDialog },
  data () {
    return {
      field: ''
    }
  },
  methods: {
    // 搜索
    handleSearch () {
      this.$store.commit('setField', this.field)
    },
    // 新增
    handleAddClick () {
      this.$store.commit('toggleDialogValue', JSON.stringify({
        flag: 'add',
        title: '新增用户',
        dialogValue: true
      }))
      this.$store.commit('editPerson')
    },
    // 编辑
    handleEdit (row) {
      this.$store.commit('toggleDialogValue', JSON.stringify({
        title: '编辑用户',
        flag: 'edit',
        dialogValue: true,
        id: row.id
      }))
      this.$store.commit('editPerson')
    },
    // 删除
    handleDelete (index) {
      this.$confirm('确定要删除这个用户吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('deletePerson', index)
        this.$message({
          type: 'success',
          message: '成功删除用户!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除!'
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-header {
    background: #409EFF;
    line-height: 60px;
  }
  .el-row {
    justify-content: space-around;
  }
  .el-main {
    padding: 20px 0;
  }
  .content {
    border: 1px solid #eee;
  }
  .cell {
    text-align: center;
  }
</style>
