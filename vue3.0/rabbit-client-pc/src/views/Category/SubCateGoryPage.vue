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
      <SubFilter @onFilterChange="onFilterSortChanged" />
      <!-- 二级分类页面——排序组件 -->
      <div class="goods-list">
        <SubSort @onSortChanged="onFilterSortChanged" />
      </div>
      <!-- 商品列表组件 -->
      <GoodsList v-if="goodsList" :goodsList="goodsList.items" />
      <!-- 加载更多组件 -->
      <XtxInfiniteLoading
        :finished="finished"
        :loading="loading"
        @infinite="loadMore"
      />
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "../../components/AppLayout";
import { useStore } from "vuex";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import SubFilter from "./components/SubFilter";
import SubSort from "./components/SubSort";
import GoodsList from "./components/GoodsList";
import { getSubCategoryGoodsListById } from "../../api/category";

export default {
  name: "SubCateGoryPage",
  components: { GoodsList, SubSort, SubFilter, AppLayout },
  setup() {
    //#region 获取、操作操作商品列表数据
    const { goodsList, onFilterSortChanged, loading, finished, loadMore } =
      useCategoryGoodsList();
    //#endregion
    return {
      category: useBread(),
      goodsList,
      onFilterSortChanged,
      loading,
      finished,
      loadMore,
    };
  },
};

//#region  获取二级分类面包屑相关数据
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
    return {
      topCategory,
      subCategory,
    };
  });
}

//#endregion

//#region  获取二级分裂页面 商品列表数据
function useCategoryGoodsList() {
  // 用于存储从数据端获取到的数据
  const goodsList = ref();
  // 获取路由信息对象
  const route = useRoute();
  // 存储产品Id用于作为获取数据的参数
  const reqParams = ref({
    categoryId: route.params.id,
    //  当前页
    page: 1,
    // 每次请求获取的数据条数
    pageSize: 10,
  });

  // 控制加载状态和更新状态
  const loading = ref(false);
  const finished = ref(false);
  // 获取数据的函数
  const getData = () => {
    // 加载中
    loading.value = true;
    // 通过API接口获取函数
    getSubCategoryGoodsListById(reqParams.value).then((data) => {
      // 当页码为1时 直接赋值
      if (reqParams.value.page === 1) {
        // 将获取的数据赋值给 goodsList进行存储
        goodsList.value = data.result;
        // 数据获取和复制成功 重置finished状态
        finished.value = false;
      } else {
        // 如果不是第一页那么数据需要进行累加
        goodsList.value = {
          ...data.result,
          items: [...goodsList.value.items, ...data.result.items],
        };
      }
      // 更新加载状态
      loading.value = false;

      // 如果已经时最后一页了
      if (
        reqParams.value.page === data.result.pages ||
        data.result.pages === 0
      ) {
        finished.value = true;
      }
    });
  };
  // 加载更多
  const loadMore = () => {
    reqParams.value = {
      ...reqParams.value,
      page: reqParams.value.page + 1,
    };
  };
  // 当路由发生变化的时候
  onBeforeRouteUpdate((to) => {
    // 更改获取商品列表的请求参数
    reqParams.value = {
      categoryId: to.params.id,
      page: 1,
    };
    getData();
  });
  // 当筛选数据和排序条件发生变换时
  const onFilterSortChanged = (target) => {
    reqParams.value = {
      ...reqParams.value,
      ...target,
    };
  };
  // 初始调用获取商品列表
  watch(
    () => reqParams.value,
    () => {
      getData();
    },
    {
      immediate: true,
    }
  );

  return {
    goodsList,
    getData,
    onFilterSortChanged,
    loading,
    finished,
    loadMore,
  };
}

//#endregion
</script>

<style scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
