<template>
  <AppLayout>
    <div class="container">
      <!-- 面包屑 -->
      <XtxBrand>
        <XtxBrandItem path="/">首页</XtxBrandItem>
        <Transition mode="out-in" name="fade-right">
          <XtxBrandItem
            v-if="topBreadCategory?.name"
            :key="topBreadCategory?.id"
            >{{ topBreadCategory.name }}
          </XtxBrandItem>
        </Transition>
      </XtxBrand>
      <!-- 轮播图 -->
      <XtxCarousel :bannerList="bannerList" :style="{ height: '500px' }" />
      <!-- 全部二级分类 -->
      <ShowSubCategoryList
        v-if="topBreadCategory?.children"
        :topCategoryList="topBreadCategory.children"
      />
      <!-- 二级推荐商品 -->
      <CommandGoods />
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "../../components/AppLayout";
import XtxBrandItem from "../../components/library/XtxBrandItem";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
import useBanners from "../../hooks/useBanners";
import ShowSubCategoryList from "./components/ShowCategoryList";
import CommandGoods from "./components/RecommendGoods";

export default {
  name: "TopCategoryPage",
  components: { CommandGoods, ShowSubCategoryList, XtxBrandItem, AppLayout },
  setup() {
    const topBreadCategory = useCategory();
    //#region  获取轮播图数据
    const { getBannerData, bannerList } = useBanners();
    getBannerData(2);
    //#endregion
    return { topBreadCategory, bannerList };
  },
};

function useCategory() {
  // 获取store对象和router对象
  const store = useStore();
  const router = useRoute();
  // 使用计算属性实时检测vuex中的数据为响应式数据
  return computed(() => {
    return store.state.category.list.find(
      // 根据从路由获取到的id查找一级分类数据
      (item) => item.id === router.params.id
    );
  });
}
</script>

<style scoped></style>
