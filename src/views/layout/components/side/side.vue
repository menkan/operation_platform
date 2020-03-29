<template>
  <div class="side-wrapper">
    <div v-for="(_item, index) in routes" :key="index">
      <router-link
        v-if="_item && _item.children.length <= 1 && _item.isShow"
        :to="_item.path + '/' + _item.children[0].path"
        :key="_item.children[0].name"
      >
        <el-menu-item>
          <i class="el-icon-menu"></i>
          <span slot="title">{{ _item.children[0].name }}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-else :index="`${index}`">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title" v-if="_item.name">{{ _item.name }}</span>
        </template>
        <el-menu-item-group v-for="child in _item.children" :key="child.path">
          <side-bar
            v-if="child.children && child.children.length > 0"
            :routes="[child]"
          />
          <router-link
            v-else
            :to="_item.path + '/' + child.path"
            :key="child.name"
          >
            <el-menu-item :index="_item.path + '/' + child.path">
              <!-- <i class="el-icon-menu"></i> -->
              <span v-if="child.name">{{ child.name }}</span>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </div>
  </div>
</template>

<script>
export default {
  name: "sideBar",
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // TEST CONTENTs
    // console.log("ROUTERS", this.routes);
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
