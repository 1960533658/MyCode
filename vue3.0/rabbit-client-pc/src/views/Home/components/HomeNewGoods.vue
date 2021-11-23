<template>
  <HomePanel ref="target" subTitle="新鲜出炉 品质靠谱" title="新鲜好物">
    <template v-slot:right>
      <XtxMore />
    </template>
    <template v-slot:default>
      <ul v-if="newGoodsList" class="goods-list">
        <li v-for="item in newGoodsList" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
      <Transition>
        <HomeSkeleton v-if="!newGoodsList" />
      </Transition>
    </template>
  </HomePanel>
</template>
<script>
import HomePanel from "./HomePanel";
import { getNewGoodsApi } from "../../../api/home";
import useLazyData from "../../../hooks/useLazyData";
import HomeSkeleton from "./HomeSkeleton";

export default {
  name: "HomeNewGoods",
  components: { HomeSkeleton, HomePanel },
  setup() {
    const { target, result: newGoodsList } = useLazyData(getNewGoodsApi);
    return { newGoodsList, target };
  },
};
</script>
<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>
