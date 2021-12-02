<template>
  <div v-for="item in topCategory?.children" :key="item.id" class="ref-goods">
    <div class="head">
      <h3>- {{ item.name }} -</h3>
      <p class="tag">温暖柔软，品质之选</p>
      <XtxMore />
    </div>
    <div class="body">
      <GoodsItem v-for="goods in item.goods" :key="goods.id" :goods="goods" />
    </div>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";
import { ref } from "vue";
import { getTopCategoryById } from "../../../api/category";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export default {
  name: "CommandGoods",
  components: { GoodsItem },
  setup() {
    const { topCategory, getData } = useTopCategory();
    const route = useRoute();
    getData(route.params.id);
    return {
      topCategory,
    };
  },
};

//#region  获取二级分类商品对剑（通过ID）
function useTopCategory() {
  // 存储一级分类信息的响应式数据
  const topCategory = ref();
  const getData = (id) => {
    getTopCategoryById(id).then((data) => {
      topCategory.value = data.result;
    });
  };
  // 在路由切换之前 获取到目标路由参数id 根据id 获取到最新的数据
  onBeforeRouteUpdate((to) => getData(to.params.id));
  return { topCategory, getData };
}

//#endregion
</script>
<style lang="less" scoped>
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;

  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }

    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }

  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
