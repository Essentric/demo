<template>
  <el-container>
    <el-aside width="20%" style="background-color: rgb(238, 241, 246);overflow:hidden;">
      <h2 class="logo"><a href="#/admin/login">Logo</a></h2>
      <el-menu :default-openeds="['1',]">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
          <el-menu-item-group>
            <el-menu-item index="1-1">
              <router-link :to="{name: 'surveyInfo'}" tag="div" active-class="top-link-active">
                问卷信息列表
              </router-link>
            </el-menu-item>
            <el-menu-item index="2-2" @click="refreshSummaryData">
              <router-link :to="{name: 'summaryInfo'}" tag="div" active-class="top-link-active">
                问卷汇总列表
              </router-link>
            </el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>导航二</template>
          <el-menu-item-group>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="1-2">
              <router-link :to="{name: 'login'}" tag="div" active-class="top-link-active">
                用户登录
              </router-link>
            </el-menu-item>
            <el-menu-item index="1-3">
              <router-link :to="{name: 'Login'}" tag="div" active-class="top-link-active">
                管理员登录
              </router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="height: 80px;">
        <h1>员工自评信息管理系统</h1>
        <div class="header-right">
          <span class="welcome">
            <a href="javascriptviod:(0)" style="text-decoration:none;color:#e1e;"
            v-if="adminName!=''">
              {{adminName}}
            </a>
            <a href="/#/admin/login" v-if="adminName==''">登录</a>
            ，欢迎登陆!</span>
          <template>
            <el-button class="btn-exit" type="warning" size="small" @click="exit">退出</el-button>
          </template>
        </div>
      </el-header>
      <el-main>
        <transition enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut">
          <keep-alive>
            <router-view v-if="adminName!=''"/>
          </keep-alive>
        </transition>
        <h2 v-if="adminName==''"><a href="/#/admin/login">请先登录</a></h2>
      </el-main>
      <el-footer style="height: 80px;">脚注信息</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Main',
  computed: {
    ...mapGetters(['adminName']),
  },
  methods: {
    logOut() {
      this.$http.delete('api/logout').then((res) => {
        this.$store.dispatch('changeAuthorization', res.data);
        this.$store.dispatch('changeAdminName', res.data);
        localStorage.setItem('adminName', '');
        localStorage.setItem('authorization', '');
      });
    },
    exit() {
      this.$confirm('确定要退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        this.logOut();
        this.$router.push({ name: 'Login' });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出',
        });
      });
    },
    refreshSummaryData() {
      this.$store.dispatch('getSummaryData');
    },
  },
};
</script>

<style scoped>
  .el-container {
    width: 100%;
    height: 100%;
  }
  .el-header, .el-aside, .el-main, .el-footer {
    border: 1px solid #eee;
    text-align: center;
  }
  .el-footer {
    line-height: 80px;
  }
  .el-main {
    height: 600px;
  }
  .el-header {
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
    height: 80px;
    line-height: 80px;
    border: 1px solid #eee;
  }
  .btn-exit {
    margin-left: 2em;
  }
  .top-link-active {
    color: #1b8;
    font-weight: bold;
  }
</style>
