<template>
  <el-aside width="20%">
    <el-scrollbar style="height:100%">
      <h2 class="logo"><a href="#/admin/login">Logo</a></h2>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="问卷说明" name="1">
          <ul>
            <li>本问卷共有七个部分，每部分有十项陈述。每部分的总分是10分。请将10分分配给你认为最准确地描述你的行为或感觉的项目上。</li>
            <hr>
            <li>你可以自由分配这10分，你认为哪一项越能反映你的行为或感受，就给这一项一个较高的分数；这10分既可以分别打给几项，也可以只打到一项上。</li>
            <hr>
            <li>注意：每一部分的总分必须是10分</li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title=" 问卷题目示例" name="2">
          <h3>一、我认为我能为团队做出的贡献是:</h3>
          <hr>
          <ol type='A'>
            <li>我能很快地发现并把握新的机会</li>
            <li>无论在一般或特别的问题上，我的建议都易于被他人接受</li>
            <li>我能与不同类型的人融洽地合作做事</li>
            <li>我总有许多点子</li>
            <li>我善于发掘对实现团体目标有价值的人</li>
            <li>我可使别人放心所交托给我完成的任务</li>
            <li>技术知识和经验通常是我的主要财富</li>
            <li>为创造有益的结果，我愿意面对寂寞和冷淡的对待</li>
            <li>通常我能判断某些计划或主意是否适用在某种特定情况</li>
            <li>我能理由充分而且不带偏见地提出可供选择的方案</li>
          </ol>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </el-aside>
</template>

<script>
export default {
  name: 'userLayoutAside',
  data() {
    return {
      activeName: '1',
    };
  },
};
</script>

<style scoped>
 .el-aside {
    min-width: 168px;
  }
  .el-collapse {
    padding: 10px;
  }
</style>
