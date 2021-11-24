<template>
  <AppLayout>
    <div class="container">
      <XtxBrand>
        <Transition mode="out-in" name="fade-right">
          <XtxBrandItem path="/">首页</XtxBrandItem>
        </Transition>
        <Transition mode="out-in" name="fade-right">
          <XtxBrandItem
            :key="category?.topCategory?.id"
            :path="`/category/${category?.topCategory?.id}`"
            >{{ category?.topCategory?.name }}
          </XtxBrandItem>
        </Transition>
        <Transition mode="out-in" name="fade-right">
          <XtxBrandItem
            :key="category?.subCategory?.id"
            :path="`/category/sub/${category?.subCategory?.id}`"
            >{{ category?.subCategory?.name }}
          </XtxBrandItem>
        </Transition>
      </XtxBrand>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "../../components/AppLayout";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  name: "SubCateGoryPage",
  components: { AppLayout },
  setup() {
    return { category: useBread() };
  },
};

function useBread() {
  const store = useStore();
  const route = useRoute();
  return computed(() => {
    // 临时存储一级分类
    let topCategory = null;
    // 临时存储二级分类
    let subCategory = null;
    // 遍历一级分类
    store.state.category.list.forEach((top) => {
      // 遍历二级分类
      top.children?.forEach((sub) => {
        // 通过路由上的二级id找到当前的二级数据项
        if (sub.id === route.params.id) {
          // 存储需要的一二级分类数据
          topCategory = top;
          subCategory = sub;
        }
      });
    });
    return { topCategory, subCategory };
  });
}
</script>

<style scoped></style>
