<template>
  <el-container class="layout_wrapper">
    <unheader />
    <el-container>
      <el-aside width="200px">
        <unside />
      </el-aside>
      <el-main>
        <unbreadcrumb />
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer style="height: 20px;">
      <unfooter />
    </el-footer>
  </el-container>
</template>

<script>
import unheader from "./components/head";
import unfooter from "./components/footer";
import unbreadcrumb from "./components/breadcrumb";
import unside from "./components/side";

export default {
  components: {
    unheader,
    unfooter,
    unbreadcrumb,
    unside
  }
};
</script>

<style lang="less">
.layout_wrapper {
  height: 100%;
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
  }
  .el-footer {
    font-size: 12px;
    text-align: left;
    line-height: 20px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
  }

  .el-main {
    padding: 10px;
    background-color: #e9eef3;
  }
}
</style>
