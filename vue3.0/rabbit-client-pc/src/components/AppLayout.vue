<template>
  <!--顶部导航 -->
  <AppTopNav />
  <!--头部 -->
  <AppHeader />
  <!--悬浮导航 -->
  <AppHeaderSticky />
  <slot name="default"></slot>
  <!--底部 -->
  <AppFooter />
</template>

<script>
import AppTopNav from "./AppTapNav";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { useStore } from "vuex";
import AppHeaderSticky from "./AppHeaderSticky";

export default {
  name: "AppLayout",
  components: { AppHeaderSticky, AppFooter, AppHeader, AppTopNav },
  setup() {
    const store = useStore();
    store.dispatch("category/getCategories");
  },
};
</script>

<style scoped></style>
