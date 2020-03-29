<template>
  <div class="layout-head">
    <div class="layout-head__logo">LOGO</div>
    <div class="layout-head__content">OPERATION PLATFORM</div>
    <div class="layout-head__config-w">CONFIG</div>
  </div>
</template>

<style lang="less">
.layout-head {
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;

  &__logo {
    width: 200px;
    background-color: green;
    text-align: center;
  }

  &__content {
    flex: 1;
    // background-color: #fff;
    text-align: center;
  }

  &__config-w {
    min-width: 240px;
    background-color: red;
    text-align: center;
  }
}
</style>
