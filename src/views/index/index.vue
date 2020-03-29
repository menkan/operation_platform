<template>
  <div class="index-wrapper-outter">
    <div class="title-w-t">
      基础信息
    </div>
    <div class="tab-infos">
      <el-table :data="tableData" stripe style="width: 100%;">
        <el-table-column
          prop="name"
          label="UserName"
          width="180"
        ></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="handlerConfigUser(scope.row)"
              >配置</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    // console.log(this.$route)
  },
  data() {
    return {
      tableData: [
        {
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    // config user '权限'
    handlerConfigUser(row) {
      console.log("config User ---->    ", row);
    }
  }
};
</script>
<style lang="less">
.index-wrapper-outter {
  background-color: #fff;
  .title-w-t {
    min-height: 30px;
    display: flex;
    align-items: center;
    padding: 6px;
    padding-left: 12px;
    font-size: 18px;
    font-weight: 400;
    position: relative;
    z-index: 1;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      width: 4px;
      height: 100%;
      background-color: blue;
      border-radius: 2px;
    }
  }
}
</style>
