<template>
    <div class="login">
        <div class="login-box">
            <div class="login-box-top-bg"></div>
            <div class="input-group">
                <el-input placeholder="请输入账户" v-model="login.username">
                    <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
                </el-input>
                <el-input placeholder="请输入密码" type="password" v-model="login.password">
                    <template slot="prepend"><i class="el-icon-view"></i></template>
                </el-input>
                <el-button style="width:100%" type="primary" round :loading="loading"
                @click="submit">登录</el-button>
            </div>
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
        password: '',
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['authorization', 'adminName']),
  },
  methods: {
    submit() {
      this.loading = true;
      this.$http.post('api/login', this.login).then((req) => {
        this.$store.dispatch('changeAuthorization', req.headers.authorization);//  token存入vuex
        this.$store.dispatch('changeAdminName', this.login.username);//  token存入vuex
        this.$store.dispatch('getSummaryData');
        const that = this;
        this.$message({
          dangerouslyUseHTMLString: true,
          message: '<strong>登录<i>成功</i></strong>',
          type: 'success',
          onClose() {
            that.loading = false;
            that.$router.push('main');
          },
          duration: 500,
        });
      }).catch(() => {
        const that = this;
        this.$message({
          dangerouslyUseHTMLString: true,
          message: '<strong>用户名或密码<i>错误</i></strong>',
          type: 'error',
          onClose() {
            that.loading = false;
          },
        });
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
                div,
                input {
                    background-color: transparent;
                    &:focus {
                        border-color: #85c;
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
<style lang="scss" scoped>
.input-group {
  >div {
      padding-bottom: 10%;
  }
}
</style>

