<template>
    <div class="apiTest">
      <div class="demo-input-suffix">
        账号：
        <el-input
          placeholder="请输入账号"
          v-model="input.name">
        </el-input>
      </div>
      <div class="demo-input-suffix">
        密码：
        <el-input
          placeholder="请输入密码"
          v-model="input.pwd">
        </el-input>
      </div>
      <div class="demo-input-suffix">
        电话：
        <el-input
          placeholder="请输入电话"
          v-model="input.tel">
        </el-input>
      </div>
      <div class="demo-input-suffix">
        邮箱：
        <el-input
          placeholder="请输入邮箱"
          v-model="input.mail">
        </el-input>
      </div>
      <div class="btn-group">
        <el-button @click="survey">提交</el-button>
        <el-button @click="logOut">退出</el-button>
        <el-button @click="generate">生成问卷</el-button>
        <el-input-number v-model="num" @change="handleChange" :min="1" :max="999" label="描述文字">
        </el-input-number>
        <el-button @click="surveyInfo">获取问卷信息</el-button>
      </div>
      <br/>
      <div class="table-url">
        <el-table
          :data="tableData"
          @cell-click="surveyInfo"
          style="width: 80%">
          <el-table-column
            prop='url'
            label="生成的地址">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'apiTest',
  data() {
    return {
      input: [
        {
          id: 1,
          options: [
            {
              id: 1,
              code: 'PL',
              score: 3,
            }, {
              id: 2,
              code: 'RI',
              score: 3,
            },
          ],
        },
        {
          id: 2,
          options: [
            {
              id: 1,
              code: 'PL',
              score: 3,
            }, {
              id: 2,
              code: 'RI',
              score: 3,
            },
          ],
        },
      ],
      num: '',
      tableData: [],
      isChange: false,
    };
  },
  computed: {
    ...mapGetters(['authorization']),
  },
  methods: {
    handleChange() {
      this.isChange = true;
    },
    survey() {
      this.$http.post('api/survey', {
        staff: {
          name: 'test',
          sex: '男',
          staff_no: 'a111',
        },
        questions: this.input,
        noncestr: '1-0dEG0adacd',
      }).then(() => {
        // console.log(res);
      });
    },
    logOut() {
      this.$http.delete('api/logout').then((res) => {
        this.$store.dispatch('changeAuthorization', res.data);
        localStorage.setItem('authorization', '');
      });
    },
    surveyInfo() {
      this.$http.get('api/survey/url1-0Ampedc2bf').then(() => {
        // console.log(res);
      });
    },
    generate() {
      const token = this.authorization;
      this.$http.get('api/url/generate', {
        params: {
          survey_id: 1,
          num: this.num,
        },
        headers: {
          Authorization: `Bearer${token}`,
        },
      }).then((req) => {
        if (this.isChange) {
          this.tableData = [];
        }
        req.data.forEach((element) => {
          this.tableData.push({ url: element });
        });
      });
    },
  },
};
</script>

<style>
  .apiTest {
    width: 80% !important;
    margin: auto;
  }
  .btn-group {
    margin-top: 20px;
  }
</style>
