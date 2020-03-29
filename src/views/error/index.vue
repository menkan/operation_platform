<template>
  <div class="error-wrapper">
    <div class="center-wrapper">
      <h2>404</h2>
      <div class="footer-inter">
        <h4>ERROR</h4>
        <p>the page you requested was not found</p>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@black: #000;
@white: #fff;
@fontColor: @white;

.error-wrapper {
  background: url("~assets/images/404.jpg") no-repeat fixed;
  background-size: 100% auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    background: inherit;
    filter: blur(9px);
  }
  .center-wrapper {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 50px 0;
    position: relative;
    background: inherit;
    z-index: 11;
    width: 600px;
    height: 400px;
    border-radius: 3px;
    box-shadow: 0 0 5px 1px #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    color: @fontColor;
    h2 {
      font-size: 120px;
    }
    .footer-inter {
      font-size: 18px;
    }
  }
}
</style>
