<template>
  <div class="details">
    <div class="over"></div>
    <el-carousel
    ref="answerCarousel"
    height="100%"
    type="card"
    indicator-position="none"
    arrow="never"
    :autoplay="false">
      <el-carousel-item v-for="(item, key) in surveyInfo.survey.questions" :key="key">
        <el-scrollbar style="height:100%">
          <h2>{{key + 1 + '. ' + item.question}}</h2>
          <div v-for="(opt,index) in item.options" :key="index">
            <div class="row">{{index+1 + ' ' + opt.text}}</div>
            <el-slider
                v-model=opt.score
                :max="10"
                :step="1"
                @change="handleChange(item)">
            </el-slider>
          </div>
          <el-tooltip class="item" effect="dark" content="总分数不能超过10分" placement="top">
          <div class="sum">总分: {{item.sum}}</div>
          </el-tooltip>
        </el-scrollbar>
      </el-carousel-item>
    </el-carousel>
    <el-footer>
      <el-row>
        <el-steps :active="active" finish-status="success">
          <el-step v-for="(item, key) in surveyInfo.survey.questions" :key="key"></el-step>
        </el-steps>
      </el-row>
      <!-- 答题按钮 -->
      <el-button-group>
        <el-button
        @click="prev"
        type="primary" size="mini" icon="el-icon-arrow-left">上一题</el-button>
        <el-button
        @click="next"
        type="primary" size="mini" icon="el-icon-arrow-right">下一题</el-button>
      </el-button-group>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: 'Details',
  data() {
    return {
      loading: true,
      questions: [],
      surveyInfo: {},
      active: 0,
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
    // console.log(this.surveyInfo);
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
        iTem.sum += ele.score;
      });
      return iTem.sum;
    },
    onSubmit() {
      this.setQuestion();
      this.$http.post('api/survey', {
        staff: {
          name: this.surveyInfo.staff.userName,
          sex: this.surveyInfo.staff.sex,
          staff_no: this.surveyInfo.staff.staffno,
        },
        questions: this.questions,
        noncestr: this.surveyInfo.noncestr,
      }).then((res) => {
        this.tips('恭喜你,提交成功!');
        this.questions = [];
        this.$store.commit('changeLoading');
        this.$router.push({
          name: 'result',
          params: res.data,
        });
      }).catch((error) => {
        this.questions = [];
        if (error.response.status === 400) {
          this.active -= 1;
          this.tips('您的问卷信息已录入,请勿重复提交!', 'error');
          this.$store.commit('changeLoading');
        }
      });
    },
    prev() {
      if (this.active <= 0) {
        this.tips('没有上一题哟!', 'warning');
      } else {
        this.active -= 1;
        this.$refs.answerCarousel.prev();
      }
    },
    next() {
      const coutn = this.surveyInfo.survey.questions.length; // 计数，统计当前页面有多少题
      const sum = this.handleChange(this.surveyInfo.survey.questions[this.active]);
      if (sum === 10) {
        if (this.active < coutn - 1) {
          this.active += 1;
          this.$refs.answerCarousel.next();
        } else {
          this.$confirm('已经最后一题,点击提交, 是否继续?', '提示', { // 最后一题,确认后提交问卷
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => { // 提交问卷
            this.active += 1;
            this.$store.commit('changeLoading');
            this.onSubmit();
          }).catch(() => { // 取消后可继续修改
            this.tips('已取消,请继续完善', 'info');
          });
        }
      } else if (sum > 10) {
        this.tips('总分不能超过10分!', 'warning');
      } else {
        this.tips('请务必分配10分!', 'warning');
      }
    },
    tips(message, type) {
      this.$message({ message, type });
    },
    exit() {
      this.$confirm('确定要退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).catch(() => {
        this.tips('已取消退出', 'info');
      });
    },
  },
};
</script>

<style>
  .details .el-scrollbar__wrap {
    padding: 0 1.5em;
  }
  .details .el-carousel__item--card.is-active {
    box-shadow: 0 0 15px #555;
  }
</style>

<style scoped>
  .details {
    position: relative;
    /* height: 100%; */
  }
  .over {
    position: absolute;
    z-index: 2;
    height: 100%;
    width: 100%;
  }
  .el-carousel {
    height: 100%;
  }
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
   .el-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    border: none;
    background: #fff;
    z-index: 999;
  }
  .el-row {
    flex: 1;
    margin-right: 5em;
  }
  .btn-submit {
    /* position: absolute; */
    padding: 1em 5em;
    margin-top: 10px;
  }
  /* ul, ol {
    padding: 0 1em 0 2em;
  }
  ol > li,
  ul > li {
    font-size: 14px;
    margin-top: .5em;
  } */
  /* .el-collapse-item {
    padding: 0 .5em;
  } */
  /* .el-header {
    border-bottom: 1px solid #eee;
    position: relative;
  } */
  h1 {
    position: absolute;
    float: left;
    left: 50%;
    transform: translateX(-50%);
  }
  /* .header-right {
    float: right;
    line-height: 80px;
  } */
</style>
