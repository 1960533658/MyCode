<template>
  <AppLayout>
    <template v-slot:default>
      <div class="container">
        <!-- 分类组件 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <HomeBanner />
        <HomeNewGoods />
      </div>
    </template>
  </AppLayout>
</template>

<script>
import AppLayout from "../../components/AppLayout";
import HomeCategory from "./components/HomeCategory";
import HomeBanner from "./components/HomeBanner";
import HomeNewGoods from "./components/HomeNewGoods";

export default {
  name: "HomePage",
  components: { HomeNewGoods, HomeBanner, HomeCategory, AppLayout },
};
</script>

<style scoped></style>
