<template>
  <!--el-menu 侧边栏组件:COLLAPSE 是展开收缩的侧边栏的内容-->
  <div class="side-wrapper">
    <el-menu
      default-active="2"
      @open="handleOpen"
      :collapse="isCollapse"
      @close="handleClose"
    >
      <side-bar :routes="routes" />
    </el-menu>
  </div>
</template>

<script>
import sideBar from "./side.vue";

export default {
  components: {
    sideBar
  },
  computed: {
    routes() {
      const ROUTESARRAY = this.$router.options.routes || [];
      return ROUTESARRAY.filter(item => item.isShow);
    }
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen() {},
    handleClose() {}
  }
};
</script>

<style lang="less" scoped>
.side-wrapper {
  height: auto;
}
</style>
