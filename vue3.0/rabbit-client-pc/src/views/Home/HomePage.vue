<template>
  <AppLayout>
    <template v-slot:default>
      <div class="container">
        <!-- 分类组件 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <HomeBanner />
        <!-- 新鲜好物 -->
        <HomeNewGoods />
        <!-- 人气推荐 -->
        <HomeHot />
        <!-- 产品区块 -->
        <HomeProduct />
        <!-- 最新专题 -->
        <HomeSpecial />
      </div>
    </template>
  </AppLayout>
</template>

<script>
import AppLayout from "../../components/AppLayout";
import HomeCategory from "./components/HomeCategory";
import HomeBanner from "./components/HomeBanner";
import HomeNewGoods from "./components/HomeNewGoods";
import HomeHot from "./components/HomeHot";
import HomeSpecial from "./components/HomeSpecial";
import HomeProduct from "./components/HomeProduction";

export default {
  name: "HomePage",
  components: {
    HomeProduct,
    HomeSpecial,
    HomeHot,
    HomeNewGoods,
    HomeBanner,
    HomeCategory,
    AppLayout,
  },
};
</script>

<style scoped></style>
