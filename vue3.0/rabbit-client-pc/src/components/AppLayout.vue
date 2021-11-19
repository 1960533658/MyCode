<template>
  <AppTopNav />
  <AppHeader />
  <slot name="default"></slot>
  <AppFooter />
</template>

<script>
import AppTopNav from "../../components/AppTapNav";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import { useStore } from "vuex";

export default {
  name: "AppLayout",
  components: { AppFooter, AppHeader, AppTopNav },
  setup() {
    const store = useStore();
    store.dispatch("category/getCategories");
  },
};
</script>

<style scoped></style>
