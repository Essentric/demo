<template>
<div>
    <el-main>
        <el-carousel :autoplay="false" type="card" height="600px" indicator-position="none">
        <el-carousel-item v-for="(item, key) in surveyInfo.survey.questions" :key="key">
            <h2>{{key + 1 + '. ' + item.question}}</h2>
            <div v-for="(opt,index) in item.options" :key="index">
            <div class="row">{{index+1 + ' ' + opt.text}}</div>
            <el-slider
                v-model=opt.score
                :max="10"
                :step="1"
                @change="handleChange(item, $event)">
            </el-slider>
            </div>
            <el-tooltip class="item" effect="dark" content="总分数不能超过10分" placement="top">
            <div class="sum">总分: {{item.sum}}</div>
            </el-tooltip>
        </el-carousel-item>
        </el-carousel>
    </el-main>
    <el-footer>
        <el-button
        :disabled="disabled"
        type="primary"
        class="btn-submit"
        @click="submit(surveyInfo.survey.questions)">
            提交
        </el-button>
    </el-footer>
</div>
</template>

<script>
export default {
  name: 'Details',
  data() {
    return {
      disabled: true,
      flag: true,
      questions: [],
      surveyInfo: {},
    };
  },
  created() {
    const surveyInfo = JSON.parse(localStorage.getItem('surveyInfo'));
    surveyInfo.survey.questions.forEach((ele) => {
      this.$set(ele, 'sum', 0);
      ele.options.forEach((elements) => {
        this.$set(elements, 'score', 0);
      });
    });
    this.surveyInfo = surveyInfo;
  },
  methods: {
    setQuestion() {
      this.surveyInfo.survey.questions.forEach((elements) => {
        const options = [];
        elements.options.forEach((element) => {
          options.push({ id: element.id, code: element.code, score: element.score });
        });
        this.questions.push({ id: elements.id, options });
      });
    },
    handleChange(item) {
      const iTem = item;
      iTem.sum = 0;
      iTem.options.forEach((ele) => {
        const element = ele;
        iTem.sum += element.score;
        if (iTem.sum === 10) {
          this.disabled = false;
        } else {
          this.disabled = true;
          if (iTem.sum > 10) {
            this.tips1();
          }
        }
      });
    },
    submit(questions) {
      questions.every((question, index) => {
        if (question.sum === 10) {
          if (index === questions.length - 1) {
            this.setQuestion();
            this.$http.post('api/survey', {
              staff: {
                name: this.surveyInfo.staff.username,
                sex: this.surveyInfo.staff.sex,
                staff_no: this.surveyInfo.staff.staffno,
              },
              questions: this.questions,
              noncestr: this.surveyInfo.noncestr,
            }).then((res) => {
              this.tips4();
              this.disabled = true;
              this.questions = [];
              this.$router.push({
                name: 'result',
                params: res.data,
              });
            }).catch((error) => {
              this.questions = [];
              if (error.response.status === 400) {
                this.tips3();
              }
            });
          }
          return true;
        }
        this.tips2();
        return false;
      });
    },
    tips1() {
      this.$message.error('总分不能超过10分!');
    },
    tips2() {
      this.$message.error('您的问卷未完成，请完成后再提交!');
    },
    tips3() {
      this.$message.error('您的问卷信息已录入,请勿重复提交!');
    },
    tips4() {
      this.$message.success('恭喜你,提交成功!');
    },
    exit() {
      this.$confirm('确定要退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
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
