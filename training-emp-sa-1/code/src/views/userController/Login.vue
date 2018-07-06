<template>
    <div class="login">
        <div class="login-box">
            <div class="login-box-top-bg"></div>
            <el-form class="input-group"
            :model="login"
            ref="loginForm"
            :rules="rules">
              <el-form-item prop="username">
                  <el-input placeholder="请输入名称" v-model="login.username">
                      <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
                  </el-input>
              </el-form-item>
              <el-form-item prop="sex">
                <el-radio-group v-model="login.sex">
                  <el-radio-button label="男"></el-radio-button>
                  <el-radio-button label="女"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="staffno">
                <el-input placeholder="请输入工号" v-model="login.staffno">
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
                @click="submit('loginForm')">登录</el-button>
            </el-form>
            <div class="nav-bottom">
                <div class="right">
                    <span><a href="javascript:void(0)">用户注册</a></span>
                    <span><a href="javascript:void(0)">忘记密码</a></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      login: {
        username: '',
        sex: '男',
        staffno: '',
      },
      noncestr: '',
      surveyData: {},
      loading: false,
      rules: {
        username: [
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
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true; //  打开登录加载动画
          this.$http.get(`api/survey/${this.noncestr}`).then((res) => {
            if (res.config.url.length > 4) { //  登陆成功
              localStorage.setItem('userName', this.login.username);
              this.surveyData = res.data;
              const that = this;
              this.$message({
                dangerouslyUseHTMLString: true,
                message: '<strong>登录<i>成功</i></strong>',
                type: 'success',
                onClose() { //  回调,关闭登录加载动画
                  that.loading = false;
                  that.$router.push({
                    name: 'Answer',
                    params: {
                      staff: that.login,
                      survey: res.data,
                      noncestr: that.noncestr,
                    },
                  });
                },
                duration: 500,
              });
            } else { //  网址填错
              const that = this;
              this.$message({
                dangerouslyUseHTMLString: true,
                message: '<strong>请将url随机串填写<i>正确</i></strong>',
                type: 'error',
                onClose() {
                  that.loading = false;
                },
              });
            }
          }).catch(() => { //  登录失败
            const that = this;
            this.$message({
              dangerouslyUseHTMLString: true,
              message: '<strong>请将url随机串填写<i>正确</i></strong>',
              type: 'error',
              onClose() {
                that.loading = false;
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

<style lang="scss">
    $breakpoints: (
        'xs': 'only screen and ( max-width: 480px)',
        'sm': 'only screen and ( max-width: 768px) and ( min-width: 480px)',
        'md': 'only screen and ( min-width: 992px)',
        'lg': 'only screen and ( min-width: 1200px)',
    ) !default;
    @mixin respond-to($breakpoint) {
        $query: map-get($breakpoints, $breakpoint);
        @if not $query {
          @error 'No value found for `#{$breakpoint}`'
          + '. Please make sure it is defined in `$breakpoints` map.';
        }
        @media #{if(type-of($query) == 'string', unquote($query), inspect($query))} {
          @content;
        }
    }
    .login {
        height: 100%;
        background: url('../../assets/login_bg.jpg') no-repeat;
        background-size: 100% 100%;
        .login-box {
            max-width: 500px;
            @include respond-to(xs) {
                width: 100%;
            }
            @include respond-to(sm) {
                width: 60%;
                padding-top: 10%;
            }
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40%;
            border: 1px solid #eee;
            border-radius: 20px;
            padding: 20px;
            padding-top: 15%;
            box-sizing: border-box;
            .login-box-top-bg {
                @include respond-to(sm) {
                    display: none;
                }
                @include respond-to(xs) {
                    display: none;
                }
                position: absolute;
                left: 50%;
                top: 20px;
                transform: translateX(-50%);
                width: 25%;
                height: 0;
                padding-bottom: 25%;
                border-radius: 50%;
                background: url('../../assets/login.gif') no-repeat;
                background-size: 100% 100%;
            }
            >.input-group {
              .el-form-item{
                div,
                input {
                  background-color: transparent !important;
                  &:focus {
                    border-color: #85c;
                  }
                }
              }
            }
            .nav-bottom {
                >div {
                    margin-top: 10px;
                    a {
                        color: #9cc;
                        line-height: 24px;
                        margin-right: 10px;
                    }
                }
            }
        }
    }
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    a {
      color: #000;
      text-decoration: none;
    }
</style>
