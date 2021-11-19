<template>
  <div :class="{ show: scrollTop > 78 }" class="app-header-sticky">
    <!--  取消悬浮导航对头部导航二级菜单的下拉 影响  -->
    <div v-show="scrollTop > 78" class="container">
      <RouterLink class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderNav from "./AppHeaderNav";

// import useScrollTop from "../hooks/useScrollTop";

import { useWindowScroll } from "@vueuse/core";

export default {
  name: "AppHeaderSticky",
  components: { AppHeaderNav },
  setup() {
    // 传统方式显示 隐藏悬浮导航
    // let scrollTop = useScrollTop();

    // 组件库方式 显示隐藏悬浮导航
    const { y: scrollTop } = useWindowScroll();
    return {
      scrollTop,
    };
  },
};
</script>

<style lang="less" scoped>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;

  &.show {
    transform: none;
    opacity: 1;
    transition: all 0.3s linear;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      & :hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
