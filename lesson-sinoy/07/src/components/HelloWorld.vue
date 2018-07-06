<template>
  <div class="car">
    <h1>购物车</h1>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="商品信息">
      </el-table-column>
      <el-table-column
        prop="description"
        label="商品描述">
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="num"
        label="数量">
        <template slot-scope="scope">
          <el-input-number
          size="mini"
          v-model="scope.row.num"
          @change="handleNumChange(scope.row)"
          :min="0" label="描述文字"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="total"
        label="总价 / (元)"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="12">
        合计: {{getTotal}}
      </el-col>
      <el-col :span="6">
        <el-button type="primary">结算</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      tableData: [{
        id: 5,
        num: 1,
        name: 'iPhoneX',
        description: '苹果十代',
        price: 10000,
        total: 0
      }, {
        id: 9,
        num: 1,
        name: 'Samsung9',
        description: '三星九代',
        price: 9000,
        total: 0
      }, {
        id: 4,
        num: 1,
        name: '小米8',
        description: '小米八代',
        price: 8000,
        total: 0
      }, {
        id: 16,
        num: 1,
        name: '华为7',
        description: '华为七代',
        price: 7000,
        total: 0
      }, {
        id: 10,
        num: 1,
        name: '一加6',
        description: '一加六代',
        price: 6000,
        total: 0
      }],
      multipleTable: []
    }
  },
  computed: {
    getTotal () {
      let total = 0
      this.tableData.forEach((ele) => {
        ele.total = ele.num * ele.price
      })
      total = 0
      this.tableData.forEach((element) => {
        total = total + element.total
      })
      return total
    }
  },
  methods: {
    handleNumChange (row) {
      if (row.num === 0) {
        this.$confirm('移出购物车？', {
          confrimButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已成功移除!'
          })
          this.tableData.forEach((ele, index) => {
            if (ele.id === row.id) {
              this.tableData.splice(index, 1)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消移除!'
          })
          row.num = 1
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .cell {
    text-align: center;
  }
  .el-row {
    margin-top: 30px;
  }
  .el-col {
    line-height: 40px;
  }
</style>
