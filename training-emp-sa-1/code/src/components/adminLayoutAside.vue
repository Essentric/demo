<template>
  <el-aside width="20%" style="overflow:hidden;">
    <h2 class="logo"><a href="#/admin/login">Logo</a></h2>
    <el-menu :default-openeds="layoutMenuIndex"
    ref="menu"
    @open="handleOpen"
    @close="handleClose">
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
            <router-link :to="{name: 'userLogin'}" tag="div" active-class="top-link-active">
              用户登录
            </router-link>
          </el-menu-item>
          <el-menu-item index="1-3">
            <router-link :to="{name: 'adminLogin'}" tag="div" active-class="top-link-active">
              管理员登录
            </router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'adminLayoutAside',
  computed: {
    layoutMenuIndex() {
      return this.$store.state.layoutMenuIndex;
    },
  },
  methods: {
    handleOpen() {
      this.$store.commit('changeLayoutMenuIndex', this.$refs.menu.openedMenus);
    },
    handleClose() {
      this.handleOpen();
    },
    refreshSummaryData() {
      // this.$store.dispatch('getSummaryData');
    },
  },
};
</script>

<style scoped>
  .el-aside {
    min-width: 168px;
  }
  .el-menu {
    border-right: none;
  }
  .top-link-active {
    color: #1b8;
    font-weight: bold;
  }
</style>
