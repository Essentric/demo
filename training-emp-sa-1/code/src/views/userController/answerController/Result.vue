<template>
  <div class="result">
    <el-table
      width="600px"
      :data="resultData">
      <el-table-column
        prop="code"
        label="描述">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.desc }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="scoreSum"
        label="得分">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.scoreSum }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="evaluation"
        label="评价">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.evaluation === '优秀' ? 'success' :
            '避免' ? 'danger' :
            '次要' ? 'Warning' : 'primary'"
            disable-transitions>{{scope.row.evaluation}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="danger"
      class="btn-exit"
      @click="exit">
          退出
    </el-button>
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
  created() {
    const data = this.$route.params;
    data.forEach((element) => {
      // console.log(element);
      const code = element.code;
      const desc = getScore.getDesc(code);
      const sum = getScore.getScoreSum(code, element.score);
      const obj = getScore.getEvaluation(code, sum);
      obj.desc = desc;
      this.resultData.push(obj);
    });
  },
  methods: {
    exit() {
      this.$confirm('确定要退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        this.$router.push({ name: 'login' });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出',
        });
      });
    },
  },
};
</script>

<style>
  .cell {
    text-align: center;
  }
  .btn-exit {
    position: absolute;
    padding: 1em 5em;
    left: 50%;
    bottom: 5%;
    transform: translateX(-50%);
  }
</style>
