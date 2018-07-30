<template>
  <layout v-loading="loading" class="index">
    <el-col slot="logo" :xs="24" :sm="12" :md="12" :lg="6">
      <a href="javascript:;" class="logo">江苏远大信息股份有限公司</a>
    </el-col>
    <el-col slot="menu" :md="12" class="hidden-md-and-down" style="text-align:left;overflow:hidden">
      <el-menu v-if="isAdmin"
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#0E90D2"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          <router-link :to="{name: 'surveyInfo'}" tag="div">
            问卷信息
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link :to="{name: 'summaryInfo'}" tag="div">
            汇总信息
          </router-link>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">更 多</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="4">
          <!-- <a href="javascript:;">点份外卖</a> -->
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col
    v-if="!isAdmin"
    slot="welcome" :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="hidden-xs-only">
      <span style="color: #fff; font-size: 14px;"
      v-if="userName!='' && userName!=undefined">
        <a href="javascript:;" style="font-size:16px;color:#ffd04b;">
          {{userName}}
        </a>
      ，欢迎您!</span>
      <a v-if="userName!='' && userName!=undefined"
        href="javascript:;" class="btn-exit"  @click="onExit">退出</a>
      <router-link v-if="userName=='' || userName==undefined"
      class="btn-login"
      :to="{name: 'userLogin'}"
      tag="a"
      active-class="top-link-active">登录</router-link>
    </el-col>
    <el-col
      v-if="isAdmin"
      slot="welcome" :xs="12" :sm="12" :md="12" :lg="6" :xl="6" class="hidden-xs-only">
      <span style="color: #fff; font-size: 14px;"
        v-if="adminName!='' && adminName!=undefined">
        <a href="javascript:;" style="font-size:16px;color:#ffd04b;">
          {{adminName}}
        </a>
      ，欢迎您!</span>
      <a v-if="adminName!='' && adminName!=undefined"
        href="javascript:;" class="btn-exit"  @click="onExit">退出</a>
      <router-link v-if="adminName=='' || adminName==undefined"
      class="btn-login"
      :to="{name: 'adminLogin'}"
      tag="a"
      active-class="top-link-active">登录</router-link>
    </el-col>
    <transition slot="keepRouter" v-if="!isAdmin" name="el-zoom-in-center">
      <router-view v-if="userName!='' && userName!=undefined" />
      <router-link v-if="userName=='' || userName==undefined"
      :to="{name: 'userLogin'}"
      tag="h2"
      active-class="top-link-active">
        请先登录
      </router-link>
    </transition>
    <transition slot="keepRouter" v-if="isAdmin" name="el-zoom-in-center">
      <keep-alive v-if="adminName!='' && adminName!=undefined">
       <router-view />
      </keep-alive>
      <router-link v-if="adminName=='' || adminName==undefined"
      :to="{name: 'adminLogin'}"
      tag="h2"
      active-class="top-link-active">
        请先登录
      </router-link>
    </transition>
  </layout>
</template>

<script>
import { mapGetters } from 'vuex';
import layout from '../components/layout';
// import headerLayout from '../components/headerLayout';
// import userLayoutAside from '../components/userLayoutAside';
// import adminLayoutAside from '../components/adminLayoutAside';

export default {
  name: 'index',
  components: {
    layout,
    // userLayoutAside,
    // headerLayout
    // adminLayoutAside,
  },
  data() {
    return {
      isAdmin: '',
      activeIndex: '1',
      activeName: '1',
      surveyInfo: {},
    };
  },
  computed: {
    ...mapGetters(['adminName']),
    userName: () => localStorage.getItem('userName'),
    loading() {
      return this.$store.state.loading;
    },
  },
  created() {
    if (this.$route.fullPath.includes('admin')) {
      this.isAdmin = true;
    } else if (this.$route.fullPath.includes('user')) {
      this.isAdmin = false;
      const data = this.$route.params;
      if (Object.keys(data).length !== 0) {
        localStorage.setItem('surveyInfo', JSON.stringify(data));
      }
      this.surveyInfo = JSON.parse(localStorage.getItem('surveyInfo'));
    } else {
      this.isAdmin = undefined;
      // console.log(this.isAdmin);
    }
  },
  methods: {
    logOut() { // 登出请求
      if (this.isAdmin) {
        this.$http.delete('api/logout').then((res) => {
          this.$store.dispatch('changeAuthorization', res.data);
          this.$store.dispatch('changeAdminName', res.data);
          this.$router.push({ name: 'adminLogin' });
        });
      } else {
        localStorage.setItem('userName', '');
        localStorage.setItem('resultItem', '');
        this.$router.push({ name: 'userLogin' });
      }
    },
    onExit() { // 退出事件
      this.$confirm('确定要退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      }).then(() => {
        this.logOut();
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

<style lang="scss">
// .index {
//   @import "../scss/indexLayout.scss";
// }
</style>
