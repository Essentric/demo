<template>
  <el-container class="layout">
    <el-header>
      <el-row style="line-height: 60px;height:60px;">
        <slot name="logo"></slot>
        <slot name="menu"></slot>
        <slot name="welcome"></slot>
      </el-row>
    </el-header>
    <el-main class="main">
      <slot name="keepRouter"></slot>
    </el-main>
    <el-footer><div>&copy; copyright</div></el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'layout',
};
</script>

<style lang="scss">
.layout {
  @import "../scss/indexLayout.scss";
  width: 100%;
  height: 100%;
  .contex {
    min-width: 600px;
  }
  .el-main {
    position: relative;
    height: 100%;
  }
  .el-footer {
    color: #fff;
    padding: 0;
    line-height: 60px;
    background-color: #0E90D2;
  }
}
</style>
