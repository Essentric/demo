<template>
  <el-container>
    <el-aside width="20%" style="background-color: rgb(238, 241, 246)">
      <div class="logo"><a href="javascript:void(0)">Logo</a></div>
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
    </el-aside>
    <el-container class="container">
      <el-header style="height: 80px;">
        <h1>团队角色自我知觉问卷</h1>
        <div class="header-right">
          <span class="welcome"><a href="#">{{surveyInfo.staff.username}}</a>，欢迎您!</span>
        </div>
      </el-header>
      <router-view/>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Answer',
  data() {
    return {
      activeName: '1',
      surveyInfo: {},
    };
  },
  created() {
    const data = this.$route.params;
    if (Object.keys(data).length !== 0) {
      localStorage.setItem('surveyInfo', JSON.stringify(data));
    }
    this.surveyInfo = JSON.parse(localStorage.getItem('surveyInfo'));
  },
};
</script>


<style scoped>
  h2 {
    text-align: center;
  }
  .el-carousel {
    text-align: left;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item {
    padding: 0 2em;
    overflow: auto;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: rgb(238, 241, 246);
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: rgb(238, 241, 246);
  }
  .sum {
    position: fixed;
    top: 4em;
    right: 0;
    transform: translateX(-100%);
  }
   .container {
    width: 80%;
    height: 100%;
    min-height: 767px;
    position: relative;
  }
  .el-main {
    padding: 0 20px;
    text-align: center;
  }
  .el-aside {
    min-width: 270px;
    overflow: hidden;
  }
   .el-footer {
    border-top: 1px solid #eee;
    background: #fff;
    position: fixed;
    width: 80%;
    bottom: 0;
    z-index: 999;
  }
  .btn-submit {
    position: absolute;
    padding: 1em 5em;
    left: 50%;
    margin-top: 10px;
    transform: translateX(-50%);
  }
  ul, ol {
    padding: 0 1em 0 2em;
  }
  ol > li,
  ul > li {
    font-size: 14px;
    margin-top: .5em;
  }
  .el-collapse-item {
    padding: 0 .5em;
  }
  .el-header {
    border-bottom: 1px solid #eee;
    position: relative;
  }
  h1 {
    position: absolute;
    float: left;
    left: 50%;
    transform: translateX(-50%);
  }
  .header-right {
    float: right;
    line-height: 80px;
  }
  .logo {
    text-align: center;
    height: 80px;
    line-height: 80px;
    border: 1px solid #eee;
  }
  .btn-exit {
    margin-left: 2em;
  }
</style>
