<template>
  <login-layout>
    <!-- 管理员登录表单 -->
    <div class="admin-input-group" v-if="isAdmin">
      <el-input placeholder="请输入账户" v-model="adminLoginForm.adminName">
          <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
      </el-input>
      <el-input placeholder="请输入密码" type="password" v-model="adminLoginForm.password">
          <template slot="prepend"><i class="el-icon-view"></i></template>
      </el-input>
      <el-button style="width:100%" type="primary" round :loading="loading"
      @click="adminLogin">登录</el-button>
    </div>
    <!-- 用户登录表单 -->
    <el-form class="user-input-group" v-if="!isAdmin">
      <el-form class="input-group"
      :model="userLoginForm"
      ref="loginForm"
      :rules="rules">
        <el-form-item prop="username">
            <el-input placeholder="请输入名称" v-model="userLoginForm.userName">
                <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
            </el-input>
        </el-form-item>
        <el-form-item prop="sex">
          <el-radio-group v-model="userLoginForm.sex">
            <el-radio-button label="男"></el-radio-button>
            <el-radio-button label="女"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="staffno">
          <el-input placeholder="请输入工号" v-model="userLoginForm.staffno">
              <template slot="prepend"><i class="el-icon-tickets"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入url随机串"
          v-model="noncestr">
              <template slot="prepend"><i class="el-icon-tickets"></i></template>
          </el-input>
        </el-form-item>
          <el-button style="width:100%" type="primary" round :loading="loading"
          @click="userLogin">登录</el-button>
      </el-form>
    </el-form>
  </login-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import loginLayout from '../components/loginLayout';

export default {
  name: 'login',
  components: { loginLayout },
  data() {
    return {
      adminLoginForm: { // 管理员登录表单
        adminName: '',
        password: '',
      },
      loading: false,
      userLoginForm: { // 用户登录表单
        userName: '',
        sex: '男',
        staffno: '',
      },
      noncestr: '',
      rules: {
        userName: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请输入用户性别', trigger: 'blur' },
        ],
        staffno: [
          { required: true, message: '请输入用户工号', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(['authorization']),
    isAdmin() { // 标记当前页属于用户登录还是管理员登录
      if (this.$route.name === 'adminLogin') {
        return true;
      }
      return false;
    },
  },
  methods: {
    adminLogin() { // 管理员登录事件
      this.loading = true;
      this.$http.post('api/login', {
        username: this.adminLoginForm.adminName,
        password: this.adminLoginForm.password,
      }).then((req) => {
        this.$store.dispatch('changeAuthorization', req.headers.authorization);//  token存入vuex
        this.$store.dispatch('changeAdminName', this.adminLoginForm.adminName);//  adminName存入vuex
        // this.$store.dispatch('getSummaryData');
        this.$message({
          dangerouslyUseHTMLString: true,
          message: '<strong>登录<i>成功</i></strong>',
          type: 'success',
          onClose: () => {
            this.loading = false;
            this.$router.push({
              name: 'surveyInfo',
              params: { adminName: this.adminLoginForm.adminName },
            });
          },
          duration: 1000,
        });
      }).catch(() => {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: '<strong>用户名或密码<i>错误</i></strong>',
          type: 'error',
          onClose: () => {
            this.loading = false;
          },
        });
      });
    },
    userLogin() { // 用户登录事件
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true; //  打开登录加载动画
          this.$http.get(`api/survey/${this.noncestr}`).then((res) => {
            if (res.data.questions) { //  登陆成功
              localStorage.setItem('userName', this.userLoginForm.userName);
              this.$message({
                dangerouslyUseHTMLString: true,
                message: '<strong>登录<i>成功</i></strong>',
                type: 'success',
                onClose: () => { //  回调,关闭登录加载动画
                  this.loading = false;
                  this.$router.push({
                    name: 'details',
                    params: {
                      staff: this.userLoginForm,
                      survey: res.data,
                      noncestr: this.noncestr,
                      userName: this.userLoginForm.userName,
                    },
                  });
                },
                duration: 1000,
              });
            } else { //  网址填错
              this.$message({
                dangerouslyUseHTMLString: true,
                message: '<strong>请将url随机串填写<i>正确</i></strong>',
                type: 'error',
                onClose: () => {
                  this.loading = false;
                },
              });
            }
          }).catch(() => { //  登录失败
            this.$message({
              dangerouslyUseHTMLString: true,
              message: '<strong>请将url随机串填写<i>正确</i></strong>',
              type: 'error',
              onClose: () => {
                this.loading = false;
              },
            });
          });
        } else { //  信息填写不完整
          this.$message({
            dangerouslyUseHTMLString: true,
            message: '<strong>请将信息填写<i>完整</i></strong>',
            type: 'error',
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-input-group {
  >div {
      padding-bottom: 10%;
  }
}
</style>
